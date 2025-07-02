import _ from 'lodash';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { IssueType, MemberRole, Project, User } from '@prisma/client';
import { TransactionClient } from '../../db';
import { notFoundError } from '../../libraries/errors/notFoundError';
import { conflictError } from '../../libraries/errors/conflictError';
import {  ISSUE_NOT_FOUND, ALREADY_ASSIGNED_ISSUE, ASSIGNEE_NOT_MEMBER, ASSIGNEE_NOT_CONTRIBUTOR, PROJECT_NOT_FOUND, ASSIGNEE_NOT_FOUND, INVALID_ISSUE_TYPE } from '../../globals';

export const assineIssue: MutationResolvers['assineIssue'] = async (
  _,
  args,
  context
) => {
  const assignee: User = await context.client.user.findUnique({
    where: { id: args.input.assigneeId },
    select: {
      id: true,
    },
  }) as User

  if (!assignee) {
    throw new notFoundError(ASSIGNEE_NOT_FOUND.MESSAGE, ASSIGNEE_NOT_FOUND.CODE);
  }

  const project = await context.client.project.findUnique({
    where: { id: args.input.projectId },
    include: {
      issues: {
        where: {
          id: args.input.issueId,
        },
        select: {
          id: true,
          assigneeId: true,
          projectId: true,
          type: true,
        },
      },
      teams: {
        select: {
          team: {
            select: {
              id: true,
              users: {
                where: {
                  userId: assignee.id,
                },
                select: {
                  id: true,
                  userId: true,
                  role: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!project) {
    throw new notFoundError(PROJECT_NOT_FOUND.MESSAGE, PROJECT_NOT_FOUND.CODE);
  }
  if (project.issues.length === 0) {
    throw new notFoundError(ISSUE_NOT_FOUND.MESSAGE, ISSUE_NOT_FOUND.CODE);
  }

  const issue = project.issues[0];

  if (!issue) {
    throw new notFoundError(ISSUE_NOT_FOUND.MESSAGE, ISSUE_NOT_FOUND.CODE);
  }

  if (issue.type === IssueType.EPIC || issue.type === IssueType.STORY) {
    throw new conflictError(INVALID_ISSUE_TYPE.MESSAGE, INVALID_ISSUE_TYPE.CODE);
  }
  if (issue.assigneeId === args.input.assigneeId) {
    throw new conflictError(ALREADY_ASSIGNED_ISSUE.MESSAGE, ALREADY_ASSIGNED_ISSUE.CODE);
  }
  if (issue.projectId !== args.input.projectId) {
    throw new conflictError(ISSUE_NOT_FOUND.MESSAGE, ISSUE_NOT_FOUND.CODE);
  }

  let role = null;

  const isMember = project.teams.some((team: any) =>
    team.team.users.some((user: any) => {
      if (user.userId === assignee.id) {
        role = user.role;
        return true;
      }
    })
  );
  if (!isMember) {
    throw new conflictError(ASSIGNEE_NOT_MEMBER.MESSAGE, ASSIGNEE_NOT_MEMBER.CODE);
  }

  if (role === MemberRole.Viewer) {
    throw new conflictError(ASSIGNEE_NOT_CONTRIBUTOR.MESSAGE, ASSIGNEE_NOT_CONTRIBUTOR.CODE);
  }

  try {
    await context.client.$transaction(async (prisma: TransactionClient) => {
      await prisma.issue.update({
        where: {
          id: issue.id,
        },
        data: {
          assignee: {
            connect: {
              id: assignee.id,
            },
          },
        },
      });

      await prisma.user.update({
        where: {
          id: assignee.id,
        },
        data: {
          assignedIssues: {
            connect: {
              id: issue.id,
            },
          },
        },
      });
    });
  }
  catch (e) {
    console.log(e);
    throw new Error("update issue and user failed")
  }

  return {
    message: 'Issue assigned successfully',
    success: true,
  };
};

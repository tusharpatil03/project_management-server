import _ from 'lodash';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { IssueType, MemberRole, Project, User } from '@prisma/client';
import { PrismaClientType, TransactionClient } from '../../db';

export const assineIssue: MutationResolvers['assineIssue'] = async (
  _,
  args,
  context
) => {
  try {
    const assignee: User = await context.client.user.findUnique({
      where: { id: args.input.assigneeId },
      select: {
        id: true,
      },
    }) as User

    if (!assignee) {
      throw new Error(`Assignee Not Found with id: ${args.input.assigneeId}`);
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
      throw new Error(`Project Not Found with id: ${args.input.projectId}`);
    }
    if (project.issues.length === 0) {
      throw new Error(`Issue Not Found with id: ${args.input.issueId}`);
    }

    const issue = project.issues[0];

    if (!issue) {
      throw new Error("Project Has no issues")
    }
    
    if (issue.type === IssueType.EPIC || issue.type === IssueType.STORY) {
      throw new Error("Issue types Epic and Story can not be Assigned")
    }
    if (issue.assigneeId === args.input.assigneeId) {
      throw new Error('issue is already assigned to this user');
    }
    if (issue.projectId !== args.input.projectId) {
      throw new Error('issue does not belong to this project');
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
      throw new Error('Assignee is not a member of the project');
    }

    if (role === MemberRole.Viewer) {
      throw new Error('Assignee is not a contributor of this project');
    }

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
  } catch (e) {
    console.log('Issue Assing Error: ', e);
    throw new Error('Failed to assign Issue');
  }

  return {
    message: 'Issue assigned successfully',
    success: true,
  };
};

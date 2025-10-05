import _ from 'lodash';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { ActivityAction, EntityType, IssueStatus, MemberRole } from '@prisma/client';
import { notFoundError } from '../../libraries/errors/notFoundError';
import { conflictError } from '../../libraries/errors/conflictError';
import { UNAUTHORIZED_USER, ISSUE_NOT_FOUND, PROJECT_NOT_FOUND } from '../../globals';
import { buildActivityData, CreateActivityInput } from '../../services/Activity/Create';
import { client, TransactionClient } from '../../db/db';

export const updateIssueStatus: MutationResolvers['updateIssueStatus'] = async (
  _,
  args,
  context
) => {

  if (!context.userId) {
    throw new conflictError(UNAUTHORIZED_USER.message, UNAUTHORIZED_USER.code);
  }

  if (!context.userRole || context.userRole === MemberRole.Viewer) {
    throw new conflictError(UNAUTHORIZED_USER.message, UNAUTHORIZED_USER.code);
  }

  const project = await context.client.project.findUnique({
    where: {
      id: args.projectId,
    },
    select: {
      id: true,
      creatorId: true,
      teams: {
        select: {
          team: {
            select: {
              users: {
                where: {
                  id: context.userId,
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

  if (args.status === IssueStatus.DONE) {
    const issue = await context.client.issue.findUnique({
      where: {
        id: args.issueId,
      },
      select: {
        id: true,
        type: true,
        childrens: {
          select: {
            id: true,
            status: true,
            childrens: {
              select: {
                id: true,
                status: true,
              }
            }
          }
        }
      }
    });

    if (!issue) {
      throw new notFoundError(ISSUE_NOT_FOUND.MESSAGE, ISSUE_NOT_FOUND.CODE);
    }

    // Recursively check if all children are DONE
    function allChildrenDone(children: any[]): boolean {
      return children.every(child =>
        child.status === IssueStatus.DONE &&
        (!child.childrens || allChildrenDone(child.childrens))
      );
    }

    if (issue.childrens && issue.childrens.length > 0 && !allChildrenDone(issue.childrens)) {
      throw new conflictError(
        "Children Issues are not DONE yet",
        "issue.childNotDone"
      );
    }
  }

  try {
    await context.client.$transaction(async (t: TransactionClient) => {
      await t.issue.update({
        where: {
          id: args.issueId,
        },
        data: {
          status: args.status,
        },
      });
    });
  } catch (e) {
    throw new conflictError('Unable to Update Issue', 'issue.updateFailed');
  }

  //create activity
  const createActivityInput: CreateActivityInput = {
    action: ActivityAction.ISSUE_UPDATED,
    entityType: EntityType.ISSUE,
    entityId: args.issueId,
    userId: context.userId,
    issueId: args.issueId,
    projectId: args.projectId,
  }
  try {
    await client.activity.create({
      data: buildActivityData(createActivityInput)
    });
  } catch (e) {
    console.log("Failed to create activity", e);
  }

  return {
    message: 'Issue Updated',
    success: true,
  };
};

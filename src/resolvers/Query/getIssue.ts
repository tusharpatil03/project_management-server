import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import _ from 'lodash';
import { InterfaceUserRole, isUserPartOfProject } from './allSprints';

export const getIssueById: QueryResolvers['getIssueById'] = async (
  _,
  args,
  context
) => {
  let issue = await context.client.issue.findUnique({
    where: { id: args.issueId },
    include: {
      assignee: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profile: {
            select: {
              id: true,
              avatar: true,
            }
          }
        }
      },
    }
  });

  if (!issue) {
    throw new Error('issue not found');
  }

  const isPartOfProject: InterfaceUserRole = await isUserPartOfProject(context.userId, issue.projectId, context.client);

  if (issue.creatorId !== context.userId) {
    if (!isPartOfProject) {
      throw new Error("You Are Authorized person to view this project")
    }
  }

  const creator = await context.client.user.findFirst({
    where: {
      id: issue.creatorId
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      profile: {
        select: {
          id: true,
          avatar: true
        }
      }
    }
  });


  return {
    ...issue,
    creator: creator
  };
};

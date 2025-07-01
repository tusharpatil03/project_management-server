import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import _ from 'lodash';
import { InterfaceUserRole, isUserPartOfProject } from './allSprints';

export const getIssueById: QueryResolvers['getIssueById'] = async (
  _,
  args,
  context
) => {

  const issue = await context.client.issue.findUnique({
    where: { id: args.issueId },
    include: {
      assignee: {
        select: {
          id: true,
          email: true,
          username: true
        }
      }
    }
  });

  if (!issue) {
    throw new Error('issue not found');
  }

  const isPartOfProject: InterfaceUserRole = await isUserPartOfProject(context.userId, issue.projectId, context.client);

  if (issue.projectId !== context.userId) {
    if (!isPartOfProject) {
      throw new Error("You Are Authorized person to view this project")
    }
  }

  return issue;
};

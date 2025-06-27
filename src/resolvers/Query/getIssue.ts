import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import _ from 'lodash';
import { getUserWithTeams, isUserPartOfProject } from './allSprints';

export const getIssueById: QueryResolvers['getIssueById'] = async (
  _,
  args,
  context
) => {
  const user = await getUserWithTeams(context.userId, context.client)
  if (!user) {
    throw new Error("User Not Found")
  }

  const userTeamIds = user.teams.map((t) => t.teamId)
  const projectTeamIds = await context.client.projectTeam.findMany({
    where: {
      projectId: args.issueId
    },
    select: {
      teamId: true
    }
  });
  const isAuthorized = isUserPartOfProject(userTeamIds, projectTeamIds)
  if (!isAuthorized) {
    throw new Error('You are not authorized to view this Project');
  }

  const issue = await context.client.issue.findUnique({
    where: { id: args.issueId },
    select: {
      id: true,
      title: true,
      description: true,
      dueDate: true,
      assignee: {
        select: {
          id: true,
          username: true,
          email: true,
        }
      },
      assigneeId: true
    }
  });

  if (!issue) {
    throw new Error('issue not found');
  }
  
  return issue;
};

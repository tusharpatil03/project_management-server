import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { InterfaceIssue } from '../Mutation/createIssue';
import { getUserWithTeams } from './allSprints';
import { isUserPartOfProject } from './allSprints';

export const getAllIssues: QueryResolvers['getAllIssues'] = async (
  _,
  args,
  context
) => {

  const user = await getUserWithTeams(context.userId, context.client)

  if (!user) {
    throw new Error('User not found');
  }

  const project = await context.client.project.findUnique({
    where: { id: args.projectId },
    select: { creatorId: true },
  });

  // Fetch teams working on the project and check if the user is part of any team
  const userTeamIds = user.teams.map((t) => t.teamId)
  const projectTeams = await context.client.projectTeam.findMany({
    where: { projectId: args.projectId },
    select: { teamId: true },
  });

  if (isUserPartOfProject(userTeamIds, projectTeams)) {
    throw new Error("You Are Authorized person to view this project")
  }

  // Fetch the project and its issues with proper includes and pagination
  const issues = await context.client.issue.findMany({
    where: { projectId: args.projectId },
    select: {
      id: true,
      title: true,
      type: true,
      status: true,
      dueDate: true,
      sprintId: true,
      projectId: true,
      childrens: {
        select: {
          id: true,
          type: true,
          title: true,
          dueDate: true,
          childrens: {
            select: {
              id: true,
              type: true,
              title: true,
              dueDate: true,
            }
          }
        }

      }
    }
  });


  if (!issues) {
    throw new Error('issues not found');
  }

  return issues;
};

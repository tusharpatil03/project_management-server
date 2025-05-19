import { client } from '../../db';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { getUserWithTeams } from './getAllSprint';
import { isUserPartOfProject } from './getAllSprint';

export const getAllTasks: QueryResolvers['getAllTasks'] = async (
  _,
  args,
  context
) => {

  const user = await getUserWithTeams(context.authData.userId)

  if (!user) {
    throw new Error('User not found');
  }

  const project = await client.project.findUnique({
    where: { id: args.projectId },
    select: { creatorId: true },
  });

  // Fetch teams working on the project and check if the user is part of any team
  const userTeamIds = user.teams.map((t) => t.teamId)
  const projectTeams = await client.projectTeam.findMany({
    where: { projectId: args.projectId },
    select: { teamId: true },
  });

  if (isUserPartOfProject(userTeamIds, projectTeams)) {
    throw new Error("You Are Authorized person to view this project")
  }

  // Fetch the project and its tasks with proper includes and pagination
  const tasks = await client.task.findMany({
    where: { projectId: args.projectId },
    include: {
      assignee: {
        include: {
          profile: true,
        },
      },
      project: {
        include: {
          creator: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  });

  if (!tasks) {
    throw new Error('Taska not found');
  }

  return tasks;
};

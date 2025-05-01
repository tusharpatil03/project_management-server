import { client } from '../../db';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';

export const getAllTasks: QueryResolvers['getAllTasks'] = async (
  _,
  args,
  context
) => {
  const userId = context.authData.userId;

  // Fetch the user and their teams
  const user = await client.user.findUnique({
    where: { id: userId },
    include: {
      userTeams: {
        select: {
          teamId: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const project = await client.project.findUnique({
    where: { id: args.projectId },
    select: { creatorId: true },
  });

  // Fetch teams working on the project and check if the user is part of any team
  const projectTeams = await client.projectTeam.findMany({
    where: { projectId: args.projectId },
    select: { teamId: true },
  });

  const userTeamIds = user.userTeams.map((userTeam) => userTeam.teamId);
  const isUserPartOfProject = projectTeams.some((team) =>
    userTeamIds.includes(team.teamId)
  );

  if (project?.creatorId !== userId) {
    if (!isUserPartOfProject) {
      throw new Error('You are not part of this project');
    } else {
      throw new Error('You are not authorized to view this project');
    }
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

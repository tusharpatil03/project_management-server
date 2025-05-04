import _ from 'lodash';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { client } from '../../db';

const getUserWithTeams = async (userId: string) => {
  const user = await client.user.findUnique({
    where: { id: userId },
    include: {
      userTeams: {
        select: { teamId: true },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const isUserPartOfProject = (userTeamIds: string[], projectTeams: { teamId: string }[]) => {
  return projectTeams.some((team) => userTeamIds.includes(team.teamId));
};

const getProjectWithSprints = async (projectId: string) => {
  const project = await client.project.findUnique({
    where: { id: projectId },
    include: {
      sprints: {
        include: {
          tasks: {
            include: {
              assignee: {
                select: { id: true, email: true, username: true },
              },
            },
          },
          creator: {
            select: { id: true, email: true, username: true },
          },
        },
      },
    },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  return project;
};

export const getAllSprints: QueryResolvers['getAllSprints'] = async (_, args, context) => {
  const userId = context.authData.userId;

  const user = await getUserWithTeams(userId);
  const userTeamIds = user.userTeams.map((userTeam) => userTeam.teamId);

  const projectTeams = await client.projectTeam.findMany({
    where: { projectId: args.projectId },
    select: { teamId: true },
  });

  const project = await getProjectWithSprints(args.projectId);

  if (project.creatorId !== userId && !isUserPartOfProject(userTeamIds, projectTeams)) {
    throw new Error('You are not authorized to view this project');
  }

  if (!project.sprints || project.sprints.length === 0) {
    throw new Error('No sprints found for this project');
  }

  return project.sprints;
};

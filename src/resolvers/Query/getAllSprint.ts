import _ from 'lodash';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { client } from '../../db';

export const getUserWithTeams = async (userId: string) => {
  const user = await client.user.findUnique({
    where: { id: userId },
    include: {
      teams: {
        select: { teamId: true },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const isUserPartOfProject = (
  userTeamIds: string[],
  projectTeams: { teamId: string }[]
) => {
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
        },
      },
    },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  return project;
};

export const getAllSprints: QueryResolvers['getAllSprints'] = async (
  _,
  args,
  context
) => {
  const userId = context.authData.userId;

  const user = await getUserWithTeams(userId);
  const userTeamIds = user.teams.map((team) => team.teamId);

  const projectTeams = await client.projectTeam.findMany({
    where: { projectId: args.projectId },
    select: { teamId: true },
  });

  const project = await getProjectWithSprints(args.projectId);

  if(!isUserPartOfProject(userTeamIds, projectTeams)){
    throw new Error("You Are Authorized person to view this project")
  }

  if (!project.sprints || project.sprints.length === 0) {
    throw new Error('No sprints found for this project');
  }

  return project.sprints;
};

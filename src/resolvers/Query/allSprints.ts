import _ from 'lodash';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { client, PrismaClientType } from '../../db';

export const getUserWithTeams = async (userId: string, client: PrismaClientType) => {
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


export const getAllSprints: QueryResolvers['getAllSprints'] = async (
  _,
  args,
  context
) => {
  const userId = context.userId;

  const user = await getUserWithTeams(userId, context.client);
  const userTeamIds = user.teams.map((team: { teamId: string }) => team.teamId);

  const projectTeams = await context.client.projectTeam.findMany({
    where: { projectId: args.projectId },
    select: { teamId: true },
  });

  const project = await client.project.findUniqueOrThrow({
    where: {
      id: args.projectId
    },
    select: {
      id: true,
      creatorId: true,
    }
  })

  const sprints = await client.sprint.findMany({
    where: {
      projectId: project.id
    },
    select: {
      id: true,
      status: true,
      title: true,
      dueDate: true,
      creatorId: true,
      issues: {
        select: {
          id: true,
          title: true,
          status: true,
          type: true,
          dueDate: true,
          assignee: {
            select: {
              username: true,
              email: true,
              id: true
            }
          }
        }
      }
    }
  });

  if (project.creatorId !== context.userId) {
    if (!isUserPartOfProject(userTeamIds, projectTeams)) {
      throw new Error("You Are Authorized person to view this project")
    }
  }



  if (!sprints || sprints.length === 0) {
    throw new Error('No sprints found for this project');
  }

  return sprints;
};

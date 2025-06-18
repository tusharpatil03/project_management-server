import { Team, UserTeam } from '@prisma/client';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { getUserWithTeams, isUserPartOfProject } from './getAllSprint';

export const getSprintById: QueryResolvers['getSprintById'] = async (
  _,
  args,
  context
) => {
  const sprint = await context.client.sprint.findUnique({
    where: {
      id: args.id,
      projectId: args.projectId,
    },
    select: {
      id: true,
      projectId: true,
      title: true,
      dueDate: true,
      status: true,
      tasks: {
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          dueDate: true,
          assignee: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      },
      creatorId: true,
      project: {
        select: {
          id: true,
          creatorId: true,
          key: true,
        },
      },
    },
  });
  if (!sprint) {
    throw new Error('Sprint not found');
  }

  const user = await getUserWithTeams(context.userId, context.client)
  if(!user){
    throw new Error("User Not Found")
  }

  const userTeamIds = user.teams.map((t)=> t.teamId)
  const projectTeamIds = await context.client.projectTeam.findMany({
    where: {
      projectId: args.projectId
    },
    select: {
      teamId: true
    }
  });

  const isAuthorized = isUserPartOfProject(userTeamIds, projectTeamIds)

  if (!isAuthorized) {
    throw new Error('You are not authorized to view this Sprint');
  }
  return sprint;
};

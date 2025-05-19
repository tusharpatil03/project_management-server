import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import _ from 'lodash';
import { getUserWithTeams, isUserPartOfProject } from './getAllSprint';
import { client } from '../../db';

export const getTaskById: QueryResolvers['getTaskById'] = async (
  _,
  args,
  context
) => {
  const user = await getUserWithTeams(context.authData.userId)
  if (!user) {
    throw new Error("User Not Found")
  }

  const userTeamIds = user.teams.map((t) => t.teamId)
  const projectTeamIds = await client.projectTeam.findMany({
    where: {
      projectId: args.taskId
    },
    select: {
      teamId: true
    }
  });
  const isAuthorized = isUserPartOfProject(userTeamIds, projectTeamIds)
  if (!isAuthorized) {
    throw new Error('You are not authorized to view this Project');
  }

  const task = await client.task.findUnique({
    where: { id: args.taskId },
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
          profileId: true
        }
      },
      assigneeId: true
    }
  });

  if (!task) {
    throw new Error('task not found');
  }
  
  return task;
};

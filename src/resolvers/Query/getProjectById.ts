import { client } from '../../db';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import _ from 'lodash';
import { InterfaceUser } from '../Mutation/login';
import { InterfaceTask } from '../Mutation/createTasks';
import { InterfaceTeam } from '../Mutation/createTeam';
import { InterfaceSprint } from '../Mutation/createSprint';

export interface InterfaceProject {
  id: string;
  name: string;
  description: string;
  goal: string;
  plan: string;
  creatorId: string;
  teamId: string;
  creator: InterfaceUser;
  tasks: InterfaceTask[];
  team: InterfaceTeam;
  sprints: InterfaceSprint[];
}

export const getProjectById: QueryResolvers['getProjectById'] = async (
  _,
  args,
  context
) => {
  if (!context.authData) {
    throw new Error('Unauthorized');
  }
  const user = await client.user.findUnique({
    where: {
      id: context.authData.userId,
    },
    include: {
      projects: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const project = await client.project.findUnique({
    where: {
      id: args.id,
    },
    include: {
      creator: true,
      tasks: true,
      sprints: true,
    },
  });
  if (!project) {
    throw new Error('Project not found');
  }

  const isAuthorized =
    context.authData.userId === project.creatorId
      ? true
      : user.projects.some((p) => p.id === project.id)
        ? true
        : false;
  if (!isAuthorized) {
    throw new Error('You are not authorized to view this project');
  }
  const tasks = await client.task.findMany({
    where: {
      projectId: project.id,
    },
    include: {
      assignee: true,
      sprint: true,
      project: true,
    },
  });
  return {
    ...project,
    tasks: tasks,
  };
};

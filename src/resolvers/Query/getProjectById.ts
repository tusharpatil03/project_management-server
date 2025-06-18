import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import _ from 'lodash';
import { InterfaceTask } from '../Mutation/createTasks';
import { InterfaceSprint } from '../Mutation/createSprint';
import { Project } from '@prisma/client';



export const getProjectById: QueryResolvers['getProjectById'] = async (
  _,
  args,
  context
) => {
  if (!context.isAuth) {
    throw new Error('Unauthorized');
  }
  const user = await context.client.user.findUnique({
    where: {
      id: context.userId,
    },
    include: {
      projects: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const project = await context.client.project.findUnique({
    where: {
      id: args.projectId,
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
    context.userId === project.creatorId
      ? true
      : user.projects.some((p:Project) => p.id === project.id)
        ? true
        : false;
  if (!isAuthorized) {
    throw new Error('You are not authorized to view this project');
  }
  const tasks = await context.client.task.findMany({
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

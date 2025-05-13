import { client } from '../../db';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';

export const getSprintById: QueryResolvers['getSprintById'] = async (
  _,
  args,
  context
) => {
  const sprint = await client.sprint.findUnique({
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

  const isAuthorized =
    context.authData.userId === sprint.creatorId
      ? true
      : context.authData.userId === sprint.project.creatorId
        ? true
        : false;

  if (!isAuthorized) {
    throw new Error('You are not authorized to view this Sprint');
  }
  return sprint;
};

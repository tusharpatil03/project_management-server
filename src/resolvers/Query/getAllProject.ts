import { client } from '../../db';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import _, { includes } from 'lodash';

export const getAllProjects: QueryResolvers['getAllProjects'] = async (
  _,
  __,
  context
) => {
  const userId = context.authData.userId;

  const userExists = await client.user.findUnique({
    where: { id: userId },
    select: { id: true }, // Lightweight fetch
  });

  if (!userExists) {
    throw new Error('User not found');
  }

  const projects = await client.project.findMany({
    where: { creatorId: userId },
    include: {
      tasks: {
        include: {
          assignee: {
            include: {
              profile: true,
            },
          },
        },
      },
      creator: {
        include: {
          profile: true,
        },
      },
      sprints: {
        include: {
          tasks: {
            include: {
              assignee: true,
            },
          },
        },
      },
    },
  });

  //console.log(projects);

  return projects;
};

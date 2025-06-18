import { QueryResolvers } from '../../types/generatedGraphQLTypes';

export const getAllProjects:QueryResolvers['getAllProjects'] = async (
  _,
  args,
  context
) => {
  const userId = context.userId;

  const userExists = await context.client.user.findUnique({
    where: { id: userId },
    select: { id: true }, // Lightweight fetch
  });

  if (!userExists) {
    throw new Error('User not found');
  }


  const projects = await context.client.project.findMany({
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

  return projects;
};

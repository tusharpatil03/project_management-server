import { QueryResolvers } from '../../types/generatedGraphQLTypes';

export const getAllProjects: QueryResolvers['getAllProjects'] = async (
  _,
  args,
  context
) => {
  const userId = context.userId;

  const userExists = await context.client.user.findUnique({
    where: { id: userId },
    select: { id: true }, // lightweight fetch
  });

  if (!userExists) {
    throw new Error('User not found');
  }


  const projects = await context.client.project.findMany({
    where: {
      teams: {
        some: {
          team: {
            users: {
              some: {
                userId: context.userId
              }
            }
          }
        }
      }
    },
    include: {
      creator: {
        include: {
          profile: true,
        },
      },
    },
  });

  return projects;
};

import { QueryResolvers } from '../../types/generatedGraphQLTypes';

export const getUserById: QueryResolvers['getUserById'] = async (
  _,
  args,
  context
) => {

  const isAuthorized = context.userId === args.userId;

  const user = await context.client.user.findUnique({
    where: {
      id: args.userId,
    },
    include: {
      profile: {
        include: {
          social: true,
        }
      },
      ...(isAuthorized && {
        activities: {
          take: 3,
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            action: true,
            createdAt: true,
          },
        },
        projects: {
          take: 3,
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            name: true,
            key: true,
            description: true,
            createdAt: true,
          }
        }
      })
    }
  });

  if (!user) {
    throw new Error("Unable to Find User")
  }
  
  return user;
};

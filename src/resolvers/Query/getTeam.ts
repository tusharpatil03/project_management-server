import { QueryResolvers } from '../../types/generatedGraphQLTypes';

export const getTeamById: QueryResolvers['getTeamById'] = async (
  _,
  args,
  context
) => {
  const team = await context.client.team.findUnique({
    where: {
      id: args.teamId
    },
    include: {
      users: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              firstName: true,
              lastName: true,
              profile: {
                select: {
                  id: true,
                  avatar: true,
                }
              }
            }
          },
        }
      }
    }
  });

  if (!team) {
    throw new Error("Team Not Found")
  }

  const isMemberofTeam = team.users.some((user) => user.userId === context.userId)

  if (!isMemberofTeam) {
    throw new Error("You are Not Authorized Person")
  }


  return {
    ...team
  }
};

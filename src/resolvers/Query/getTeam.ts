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
              profile: {
                select: {
                  avatar: true,
                  firstName: true,
                  lastName: true
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

  const members = team.users.map((user) => {
    return {
      id: user.user.id,
      username: user.user.username,
      email: user.user.email
    }
  });

  return {
    ...team,
    members
  }
};

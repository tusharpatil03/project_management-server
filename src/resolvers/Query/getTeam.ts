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
    select: {
      id: true,
      name: true,
      creatorId: true,
      users: {
        select: {
          user: {
            select: {
              id: true,
              username: true,
              email: true
            }
          },
          role: true,
          userId: true,
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
    id: team.id,
    name: team.name,
    members: members
  }
};

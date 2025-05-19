import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { client } from '../../db';

export const getTeamById: QueryResolvers['getTeamById'] = async (
  _,
  args,
  context
) => {
  const team = await client.team.findUnique({
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
          }
        }
      }
    }
  });

  if (!team){
    throw new Error("Team Not Found")
  }

  if(context.authData.userId !== team.id){
    throw new Error("You are Not Authorized Person")
  }
  
  const members = team.users.map((user)=> {
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

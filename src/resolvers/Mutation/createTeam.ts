import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { TransactionClient } from '../../db';
import { ActivityAction, EntityType, MemberRole } from '@prisma/client';
import { CreateActivity, CreateActivityInput } from '../../services/Activity/Create';

//this resolver willl create a team and will return it
export const createTeam: MutationResolvers['createTeam'] = async (
  _,
  args,
  context
) => {

  //check user exist
  const user = await context.client.user.findUnique({
    where: {
      id: context.userId
    }
  });

  if (!user) {
    throw new Error("Unauthorized");
  }

  //check team with name already exist (name is unique)
  const existingTeam = await context.client.team.findFirst({
    where: {
      AND: [
        {
          name: args.input.name,
        },
        {
          creatorId: context.userId
        }
      ]
    }
  });

  if (existingTeam) {
    throw new Error(`team with name ${args.input.name} already Exist`);
  }

  let teamId: string | null = null;

  // create a team
  try {
    await context.client.$transaction(async (prisma: TransactionClient) => {
      const team = await prisma.team.create({
        data: {
          name: args.input.name,
          creatorId: context.userId
        },
      });

      //user team created to join user and team
      const userTeam = await prisma.userTeam.create({
        data: {
          team: {
            connect: {
              id: team.id
            }
          },
          user: {
            connect: {
              id: user.id
            }
          },
          role: MemberRole.Admin
        }
      });
      return userTeam;
    });
  }
  catch (e) {
    throw new Error("Unable to create Team")
  }

  //fetch user_team
  const team = await context.client.team.findFirst({
    where: {
      AND: [
        { creatorId: context.userId },
        { name: args.input.name }
      ]
    }
  });

  if (!team) {
    throw new Error("Something went wrong");
  }
  return team;
};

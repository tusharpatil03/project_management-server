import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { TransactionClient } from '../../db';
import { MemberRole } from '@prisma/client';


export const createTeam: MutationResolvers['createTeam'] = async (
  _,
  args,
  context
) => {

  const user = await context.client.user.findUnique({
    where: {
      id: context.userId
    }
  });

  if (!user) {
    throw new Error("Unauthorized");
  }

  const existingTeam = await context.client.team.findFirst({
    where: {
      AND:[
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

  try {
    await context.client.$transaction(async (prisma: TransactionClient) => {
      const team = await prisma.team.create({
        data: {
          name: args.input.name,
          creatorId: context.userId
        },
      });

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

  const userTeam = await context.client.userTeam.findFirst({
    where: {
      AND: [
        {
          team: {
            name: args.input.name
          }
        },
        {
          userId: context.userId
        },
        {
          role: MemberRole.Admin
        }
      ]
    }
  });

  if (!userTeam) {
    throw new Error("Something went wrong");
  }
  return userTeam;
};

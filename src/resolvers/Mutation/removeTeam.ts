import { PrismaClientType, TransactionClient } from '../../db';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';

export const removeTeam: MutationResolvers['removeTeam'] = async (
  _,
  args,
  context
) => {

  const team = await context.client.team.findUnique({
    where: { id: args.teamId },
    include: {
      users: {
        select: { userId: true },
      },
    },
  });

  if (!team) {
    throw new Error(`No Team Found with id: ${args.teamId}`);
  }

  if (team.creatorId !== context.userId) {
    throw new Error('You are not the creator of this team');
  }

  try {
    await context.client.$transaction(async (prisma: TransactionClient) => {
      await prisma.userTeam.deleteMany({
        where: {
          teamId: args.teamId,
        },
      });

      await prisma.projectTeam.deleteMany({
        where: {
          teamId: args.teamId,
        },
      });

      await prisma.team.delete({
        where: { id: args.teamId },
      });
    });
  } catch (e) {
    throw new Error('Error removing team');
  }

  return {
    message: 'Team removed successfully',
    success: true,
  };
}
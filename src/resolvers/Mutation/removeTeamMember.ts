import { client } from '../../db';
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';

export const removeTeamMember: MutationResolvers['removeTeamMember'] = async (
  _,
  args,
  context
) => {
  const team = await client.team.findUnique({
    where: { id: args.teamId },
    select: {
      id: true,
      users: {
        select: { id: true, userId: true },
      },
      creatorId: true,
    },
  });

  if (!team) {
    throw new Error('Team does not exist');
  }

  if (team.creatorId !== context.authData.userId) {
    throw new UnauthorizedError('You are not the creator of this team', '403');
  }

  const user = team.users.find((t) => t.userId === args.memberId);
  if (!user) {
    throw new Error('User is not part of the team');
  }

  try {
    await client.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: args.memberId },
        data: {
          teams: {
            disconnect: {
              id: user.id,
            },
          },
        },
      });
      await prisma.team.update({
        where: { id: args.teamId },
        data: {
          users: {
            disconnect: {
              id: user.id,
            },
          },
        },
      });
      await prisma.userTeam.delete({
        where: { id: user.id },
      });
    });

    const updatedTeam = await client.team.findUnique({
      where: { id: args.teamId },
      select: {
        id: true,
        name: true,
        creatorId: true,
        createdAt: true,
        updatedAt: true,
        users: {
          select: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!updatedTeam) {
      throw new Error('Team does not exist');
    }

    return {
      id: updatedTeam.id,
      name: updatedTeam.name,
      members: updatedTeam.users.map((t) => t.user),
      createdAt: updatedTeam.createdAt,
      updatedAt: updatedTeam.updatedAt,
      creatorId: updatedTeam.creatorId,
    };
  } catch (error) {
    console.error('Failed to remove team member:', error);
    throw new Error('Failed to remove team member');
  }
};

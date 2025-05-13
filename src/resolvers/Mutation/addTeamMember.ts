import { MemberRole } from '@prisma/client';
import { client } from '../../db';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';

export const addTeamMember: MutationResolvers['addTeamMember'] = async (
  _,
  args,
  context
) => {
  try {
    const team = await client.team.findUnique({
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

    const user = await client.user.findUnique({
      where: { id: args.memberId },
    });

    if (!user) {
      throw new Error(`User Not Found with id: ${args.memberId}`);
    }

    const isAlreadyMember = team.users.some(
      (team) => team.userId === args.memberId
    );

    if (isAlreadyMember) {
      throw new Error('User is already a member of the team');
    }

    const userTeam = await client.userTeam.create({
      data: {
        userId: args.memberId,
        teamId: args.teamId,
        role: args.role as MemberRole,
      },
    });

    await client.user.update({
      where: { id: args.memberId },
      data: {
        teams: {
          connect: {
            id: userTeam.id,
          },
        },
      },
    });

    const updatedTeam = await client.team.findUnique({
      where: { id: args.teamId },
      select: {
        id: true,
        name: true,
        users: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
            role: true,
          },
        },
        updatedAt: true,
      },
    });

    if (!updatedTeam) {
      throw new Error('Failed to fetch updated team after adding member');
    }

    return {
      id: updatedTeam.id,
      name: updatedTeam.name,
      members: updatedTeam.users.map((ut) => ut.user),
      updatedAt: updatedTeam.updatedAt,
    };
  } catch (error: any) {
    console.error('Failed to add team member:', error);
    throw new Error(`Failed to add team member: ${error.message || error}`);
  }
};

import { MemberRole } from '@prisma/client';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { InterfaceUserTeam } from './createTeam';

export const addTeamMember: MutationResolvers['addTeamMember'] = async (
  _,
  args,
  context
) => {
  try {
    const AdminUserTeam = await context.client.userTeam.findFirst({
      where: {
        teamId: args.teamId,
        userId: context.authData.userId,
      },
      select: {
        id: true,
        role: true,
      },
    });
    if (AdminUserTeam?.role !== MemberRole.Admin) {
      throw new Error('Unauthorized access');
    }

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

    const member = await context.client.user.findUnique({
      where: { id: args.memberId },
    });

    if (!member) {
      throw new Error(`User Not Found with id: ${args.memberId}`);
    }

    const isAlreadyMember = team.users.some(
      (team: InterfaceUserTeam) => team.userId === args.memberId
    );

    if (isAlreadyMember) {
      throw new Error('User is already a member of the team');
    }

    const userTeam = await context.client.userTeam.create({
      data: {
        userId: args.memberId,
        teamId: args.teamId,
        role: args.role as MemberRole,
      },
    });

    await context.client.user.update({
      where: { id: args.memberId },
      data: {
        teams: {
          connect: {
            id: userTeam.id,
          },
        },
      },
    });

    const updatedTeam = await context.client.team.findUnique({
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
                teams: true,
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
      userTeams: updatedTeam.users.map((ut: InterfaceUserTeam) => ut),
      updatedAt: updatedTeam.updatedAt,
    };
  } catch (error: any) {
    console.error('Failed to add team member:', error);
    throw new Error(`Failed to add team member: ${error.message || error}`);
  }
};

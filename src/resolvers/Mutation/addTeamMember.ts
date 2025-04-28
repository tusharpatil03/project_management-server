import { MemberRole } from '@prisma/client';
import { client } from '../../db';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';

export const addTeamMember: MutationResolvers['addTeamMember'] = async (
  _,
  args,
  context
) => {
  try {
    const result = await client.$transaction(async (tx) => {
      // Validate team and user existence in parallel for efficiency
      const [team, user] = await Promise.all([
        tx.team.findUnique({ where: { id: args.teamId } }),
        tx.user.findUnique({ where: { id: args.memberId } }),
      ]);

      if (!team) {
        throw new Error(`No Team Found with id: ${args.teamId}`);
      }
      if (!user) {
        throw new Error(`User Not Found with id: ${args.memberId}`);
      }

      // Check if user is already a member (unique constraint assumed)
      const existingMember = await tx.userTeam.findFirst({
        where: {
          userId: args.memberId,
          teamId: args.teamId,
        },
      });

      if (existingMember) {
        throw new Error('User is already a member of the team');
      }

      await tx.userTeam.create({
        data: {
          userId: args.memberId,
          teamId: args.teamId,
          role: args.role as MemberRole,
        },
      });

      const updatedTeam = await tx.team.findUnique({
        where: { id: args.teamId },
        include: {
          creator: true,
          userTeams: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!updatedTeam) {
        throw new Error('Failed to fetch updated team after adding member');
      }

      return updatedTeam;
    });

    return {
      id: result.id,
      name: result.name,
      creator: result.creator,
      members: result.userTeams.map((ut) => ut.user),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  } catch (error: any) {
    // Log error if needed
    throw new Error(`Failed to add team member: ${error.message || error}`);
  }
};

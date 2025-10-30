import { ActivityAction, EntityType } from '@prisma/client';
import { client, TransactionClient } from '../../config/db';
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';
import { buildActivityData, CreateActivityInput } from '../../services/Activity/Create';
import { MutationResolvers, RemoveTeamMemberInput } from '../../types/generatedGraphQLTypes';

export const removeTeamMember: MutationResolvers['removeTeamMember'] = async (
  _,
  args,
  context
) => {
  const input: RemoveTeamMemberInput = args.input;

  const team = await context.client.team.findUnique({
    where: { id: input.teamId },
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

  if (team.creatorId !== context.userId) {
    throw new UnauthorizedError('You are not the creator of this team', '403');
  }
  console.log(team.users)
  const user = team.users.find((t) => t.userId === input.memberId);
  if (!user) {
    console.log(user);
    throw new Error('User is not part of the team');
  }

  try {
    await context.client.$transaction(async (prisma: TransactionClient) => {
      await prisma.userTeam.delete({
        where: {
          id: user.id
        },
      });
    });
  } catch (error: any) {
    console.log(error.message);
    console.error('Failed to remove team member:', error);
    throw new Error('Failed to remove team member');
  }

  const updatedTeam = await context.client.team.findUnique({
    where: { id: input.teamId },
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
              email: true,
            },
          },
        },
      },
    },
  });

  //create activity
  const createActivityInput: CreateActivityInput = {
    action: ActivityAction.TEAM_MEMBER_REMOVED,
    entityType: EntityType.TEAM,
    entityId: team.id,
    description: `member removed from team`,
    userId: context.userId,
    teamId: team.id
  }
  try {
    await client.activity.create({
      data: buildActivityData(createActivityInput)
    });
  } catch (e) {
    console.log("Failed to create activity", e);
  }

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

};

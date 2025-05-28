import { MemberRole } from '@prisma/client';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { InterfaceUser } from './login';

export interface InterfaceTeam {
  id: string;
  name: string;
  creatorId: string;
  creator: InterfaceUser;
  createdAt: Date,
  updatedAt: Date,
  users: InterfaceUserTeam[],
}

export interface InterfaceUserTeam {
  id: string,
  userId: string,
  teamId: string,
  role: MemberRole,
  joinedAt: Date,
  user: InterfaceUser,
  team: InterfaceTeam
}

export const createTeam: MutationResolvers['createTeam'] = async (
  _,
  args,
  context
) => {
  const team = await context.client.team.create({
    data: {
      name: args.input.name,
      creatorId: context.authData.userId,
    },
  });
  return team;
};

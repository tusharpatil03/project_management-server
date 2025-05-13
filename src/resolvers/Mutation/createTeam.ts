import { MemberRole } from '@prisma/client';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { InterfaceUser } from './login';
import { client } from '../../db';

export interface InterfaceTeam {
  id: string;
  name: string;
  creatorId: string;
  creator: InterfaceUser;
  userTeams: {
    id: string;
    userId: string;
    teamId: string;
    role: MemberRole;
    joinedAt: Date;
  };
}

export const createTeam: MutationResolvers['createTeam'] = async (
  _,
  args,
  context
) => {
  const team = await client.team.create({
    data: {
      name: args.input.name,
      creatorId: context.authData.userId,
    },
  });
  return team;
};

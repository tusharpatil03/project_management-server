import { MemberRole } from '@prisma/client';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { InterfaceUser } from './login';

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
  }
}

export const createTeam: MutationResolvers['createTeam'] = async (
  _,
  args,
  context
) => {
  const { input } = args;
  const sprint = context.prisma.sprint.create({
    data: {
      name: input.name,
      creatorId: input.creatorId,
      members: input.memberIds,
    },
  });

  return sprint;
};

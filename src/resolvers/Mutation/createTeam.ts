import { MemberRole } from '@prisma/client';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';


export const createTeam: MutationResolvers['createTeam'] = async (
  _,
  args,
  context
) => {
  const team = await context.client.team.create({
    data: {
      name: args.input.name,
      creatorId: context.userId,
    },
  });
  return team;
};

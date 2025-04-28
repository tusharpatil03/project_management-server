import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import _ from 'lodash';

export const getTeamById: QueryResolvers['getTeamById'] = async (
  _,
  args,
  context
) => {
  const team = await context.client.team.findUnique({
    where: { creatorId: context.authData.userId },
  });

  if (!team) {
    throw new Error('team not found');
  }

  return team;
};

import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import _ from 'lodash';

export const getSprintById: QueryResolvers['getSprintById'] = async (
  _,
  args,
  context
) => {
  const sprint = await context.client.sprint.findUnique({
    where: { id: args.id, projectId: args.id },
  });

  if (!sprint) {
    throw new Error('sprint not found');
  }

  return sprint;
};

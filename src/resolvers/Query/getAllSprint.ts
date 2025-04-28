import _ from 'lodash';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';

export const getAllSprints: QueryResolvers['getAllSprints'] = async (
  _,
  args,
  context
) => {
  const userId = context.authData.userId;

  const project = await context.client.project.findUnique({
    where: { id: args.projectId },
    include: {
      sprints: true,
    },
  });

  if (!project) {
    throw new Error('project not found');
  }

  return project.sprints;
};

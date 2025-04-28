import { QueryResolvers } from '../../types/generatedGraphQLTypes';

export const getUserById: QueryResolvers['getUserById'] = async (
  _,
  args,
  context
) => {
  const user = await context.user.findUnique({
    where: {
      email: args.id,
    },
  });
  if (user == null) {
    return { message: 'failed to fetch user', success: false };
  }
  return user;
};

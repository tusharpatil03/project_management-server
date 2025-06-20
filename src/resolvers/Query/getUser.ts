import { QueryResolvers } from '../../types/generatedGraphQLTypes';

export const getUserById: QueryResolvers['getUserById'] = async (
  _,
  args,
  context
) => {
  const user = await context.client.user.findUnique({
    where: {
      id: args.userId,
    },
    select: {
      id: true,
      username: true,
      email: true
    }
  });
  if (user == null) {
    throw new Error("Unable to Find User")
  }
  return user;
};

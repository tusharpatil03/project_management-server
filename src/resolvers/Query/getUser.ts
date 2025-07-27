import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { getUserWithProfile, type UserWithProfile } from '../../services/user/GetUser';

export const getUserById: QueryResolvers['getUserById'] = async (
  _,
  args,
  context
) => {
  const user: UserWithProfile = await getUserWithProfile(args.userId)
  if (!user) {
    throw new Error("Unable to Find User")
  }

  if (user.id !== context.userId) {
    throw new Error("unauthorized access")
  }
  return user;
};

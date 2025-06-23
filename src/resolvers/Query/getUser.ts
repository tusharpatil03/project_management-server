import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { getUserWithProfile, type UserWithProfile } from '../../services/db/user';

export const getUserById: QueryResolvers['getUserById'] = async (
  _,
  args,
  context
) => {
  const user: UserWithProfile = await getUserWithProfile(args.userId)
  if (!user) {
    throw new Error("Unable to Find User")
  }
  return user;
};

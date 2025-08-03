import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { getUserWithProfile, type UserWithProfile } from '../../services/user/GetUser';

export const getUser: QueryResolvers['getUser'] = async (
  _,
  args,
  context
) => {
  const user: UserWithProfile | null = await getUserWithProfile(args.userId as string, args.email as string)
  if (!user) {
    throw new Error("Unable to Find User")
  }

  if (user.id !== context.userId) {
    throw new Error("unauthorized access")
  }
  return user;
};

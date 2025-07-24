import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken, InterfaceCreateRefreshToken } from '../../utility/auth';


export const login: MutationResolvers['login'] = async (_, args, context) => {
  const user = await context.client.user.findUnique({
    where: { email: args.input.email },
    include: {
      profile: {
        select: {
          id: true,
          token: true,
          tokenVersion: true,
          avatar: true
        }
      },
    }
  });

  if (!user) {
    throw new Error('User does not exist');
  }


  // const userProfile = await context.client.userProfile.findUnique({
  //   where: {
  //     userId: user.id,
  //   },
  //   include: {
  //     social: true,
  //   },
  // });

  if (!user.profile) {
    throw new Error('User profile not found');
  }

  const hashedPassword = await bcrypt.hash(args.input.password, user.salt);

  if (hashedPassword !== user.password) {
    throw new Error('Incorrect password');
  }

  const accessTokenPayload = {
    userId: user.id,
    email: user.email,
    username: user.username,
  };

  const accessToken = createAccessToken(accessTokenPayload);

  const refreshTokenPayload: InterfaceCreateRefreshToken = {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    tokenVersion: user.profile.tokenVersion,
  }

  const refreshToken = createRefreshToken(refreshTokenPayload);
  if (!refreshToken) {
    throw new Error('Failed to create refresh token');
  }

  try {
    await context.client.userProfile.update({
      where: {
        id: user.profile.id
      },
      data: {
        token: refreshToken,
        tokenVersion: {
          increment: 1
        }
      }
    })
  } catch (e) {
    throw new Error("falied to updated user profile with new token");
  }

  return {
    user,
    profile: user.profile,
    accessToken,
    refreshToken
  };
};

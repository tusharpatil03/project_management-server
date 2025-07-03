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
        }
      },
    }
  });

  if (!user) {
    throw new Error('User does not exist');
  }


  const userProfile = await context.client.userProfile.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      social: true,
    },
  });

  if (!userProfile) {
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
    tokenVersion: userProfile.tokenVersion,
  }

  const refreshToken = createRefreshToken(refreshTokenPayload);

  if (!refreshToken) {
    throw new Error('Failed to create refresh token');
  }

  // Update the user's profile with the new refresh token
  await context.client.userProfile.update({
    where: { id: userProfile.id },
    data: {
      token: refreshToken,
      tokenVersion: userProfile.tokenVersion + 1,
    },
  });

  return {
    user,
    profile: userProfile,
    accessToken,
    refreshToken
  };
};

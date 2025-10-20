import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import bcrypt from 'bcrypt';
import {
  createAccessToken,
  createRefreshToken,
  InterfaceCreateRefreshToken,
  sendVerificationEmail
} from '../../utility/auth';

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

  if (!user.profile) {
    throw new Error('User profile not found');
  }

  const hashedPassword = await bcrypt.hash(args.input.password, user.salt);

  if (hashedPassword !== user.password) {
    throw new Error('Incorrect password');
  }

  if (!user?.isVerified) {
    // Send verification email
    await sendVerificationEmail(user.email)
      .catch(e => {
        console.error('Failed to send verification email:', e);
      });

    throw new Error('EMAIL_NOT_VERIFIED');
  }

  const accessTokenPayload = {
    userId: user.id,
    email: user.email,
  };

  const accessToken = createAccessToken(accessTokenPayload);

  const refreshTokenPayload: InterfaceCreateRefreshToken = {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    tokenVersion: user.profile.tokenVersion,
  };

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
    });
  } catch (e) {
    throw new Error('Failed to update user profile with new token');
  }

  return {
    accessToken,
    refreshToken
  };
};
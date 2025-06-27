import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken, InterfaceCreateRefreshToken } from '../../utility/auth';
import { InterfaceCreateAccessToken } from '../../utility/auth';
import { TransactionClient } from '../../db';

export const signup: MutationResolvers['signup'] = async (_, args, context) => {
  const existingUser = await context.client.user.findFirst({
    where: {
      email: args.input.email,
    },
    include: {
      profile: true,
    },
  });

  if (existingUser) {
    // Use a specific error type for user existence
    const error = new Error('User already exists');
    error.name = 'UserExistsError';
    throw error;
  }

  const salt: string = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(args.input.password, salt);

  if (!hashedPassword) {
    const error = new Error('Unable to hash password');
    error.name = 'HashingError';
    throw error;
  }

  await context.client.$transaction(async (prisma:TransactionClient) => {


    const user = await prisma.user.create({
      data: {
        email: args.input.email,
        password: hashedPassword,
        username: args.input.username,
        salt: salt,
      },
    });
    const userProfile = await prisma.userProfile.create({
      data: {
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        user: {
          connect: {
            id: user.id
          }
        }
      },
    });
  });

  const user = await context.client.user.findUnique({
    where: {
      email: args.input.email,
    }
  });

  if (!user) {
    const error = new Error('Unable to create user');
    error.name = 'UserCreationError';
    throw error;
  }

  const userProfile = await context.client.userProfile.findUnique({
    where: {
      userId: user.id
    },
    include: {
      social: true,
    }
  });

  if (!userProfile) {
    const error = new Error('Unable to create user profile');
    error.name = 'UserProfileCreationError';
    throw error;
  }

  const accessTokenPayload: InterfaceCreateAccessToken = {
    userId: user.id,
    email: user.email,
    username: user.username,
  };

  const accessToken = createAccessToken(accessTokenPayload);

  const refreshTokenPayload: InterfaceCreateRefreshToken = {
    userId: user.id,
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: user.email,
    tokenVersion: userProfile.tokenVersion,
  }

  const refreshToken = createRefreshToken(refreshTokenPayload);

  if (!refreshToken) {
    const error = new Error('Failed to create refresh token');
    error.name = 'RefreshTokenError';
    throw error;
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
    userProfile,
    accessToken,
    refreshToken
  };
}
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../../utility/auth';
import { client } from '../../db';

import { InterfaceCreateAccessToken } from '../../utility/auth';

export const signup: MutationResolvers['signup'] = async (_, args, context) => {
  const existingUser = await client.user.findFirst({
    where: {
      OR: [{ email: args.input.email }, { username: args.input.username }],
    },
    include: {
      profile: true,
    },
  });


  if (existingUser) {
    throw new Error('User already Exists');
  }

  const salt: string = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(args.input.password, salt);

  if (!hashedPassword) {
    throw new Error('Unable to hash password');
  }

  try {
    const result = await client.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email: args.input.email,
          password: hashedPassword,
          username: args.input.username,
          salt: salt,
          role: 'Admin',
        },
      });

      const userProfile = await prisma.userProfile.create({
        data: {
          firstName: args.input.firstName,
          lastName: args.input.lastName,
          userId: user.id,
        },
      });

      return { user, userProfile };
    });

    const accessTokenPayload: InterfaceCreateAccessToken = {
      userId: result.user.id,
      email: result.user.email,
      firstName: result.userProfile.firstName,
      lastName: result.userProfile.lastName,
    };

    const accessToken = createAccessToken(accessTokenPayload);

    // Remove sensitive fields before returning the user
    const { password, salt: string, ...safeUser } = result.user;

    return {
      accessToken,
      user: safeUser,
      userProfile: result.userProfile,
    };
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error('Unable to complete signup process');
  }
};

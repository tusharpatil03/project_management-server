import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../../utility/auth';
import { InterfaceCreateAccessToken } from '../../utility/auth';
import { PrismaClientType } from '../../db';

export const signup: MutationResolvers['signup'] = async (_, args, context) => {
  const existingUser = await context.client.user.findFirst({
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

  try {
    const salt: string = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(args.input.password, salt);

    if (!hashedPassword) {
      throw new Error('Unable to hash password');
    }

    const result = await context.client.$transaction(async (prisma: PrismaClientType) => {


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
      },
      select: {
        id: true,
        email: true,
        username: true,
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Unable to create User');
    }

    const accessTokenPayload: InterfaceCreateAccessToken = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const accessToken = createAccessToken(accessTokenPayload);

    return {
      accessToken,
      user,
      userProfile: user.profile,
    };
  } catch (error) {
    console.error('Error during signup:', error);
    throw new Error('Unable to complete signup process');
  }
};

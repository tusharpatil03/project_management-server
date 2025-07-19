import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import bcrypt from 'bcrypt';
import { emailVerificationToken, sendVerificationEmail } from '../../utility/auth';
import { client, TransactionClient } from '../../db';

export const signup: MutationResolvers['signup'] = async (_, args, context) => {
  const existingUser = await context.client.user.findFirst({
    where: {
      OR: [
        {
          email: args.input.email
        },
        {
          username: args.input.username
        }
      ]
    },
    include: {
      profile: true,
    },
  });

  if (existingUser) {
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

  const token = emailVerificationToken(args.input.email);
  if (!token) {
    throw new Error("Unable to generate verification token");
  }

  try {
    sendVerificationEmail(token, args.input.email);
  }
  catch (e) {
    throw new Error("Unable to send verification email")
  }

  try {
    await context.client.$transaction(async (prisma: TransactionClient) => {

      const user = await prisma.user.create({
        data: {
          firstName: args.input.firstName,
          lastName: args.input.lastName,
          email: args.input.email,
          password: hashedPassword,
          username: args.input.username,
          salt: salt,
        },
      });
      await prisma.userProfile.create({
        data: {
          user: {
            connect: {
              id: user.id
            }
          }
        },
      });
    });
  }
  catch (e) {
    throw new Error("Unable to create user");
  }

  // const user = await context.client.user.findUnique({
  //   where: {
  //     email: args.input.email,
  //   }
  // });

  // if (!user) {
  //   const error = new Error('Unable to create user');
  //   error.name = 'UserCreationError';
  //   throw error;
  // }

  // const userProfile = await context.client.userProfile.findUnique({
  //   where: {
  //     userId: user.id
  //   },
  //   include: {
  //     social: true,
  //   }
  // });

  // if (!userProfile) {
  //   const error = new Error('Unable to create user profile');
  //   error.name = 'UserProfileCreationError';
  //   throw error;
  // }

  return {
    message: "user signup complete",
    status: 200,
    success: true
  };
}
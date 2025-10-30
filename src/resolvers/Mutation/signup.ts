import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import bcrypt from 'bcrypt';
import { emailVerificationToken, sendVerificationEmail } from '../../utility/auth';
import { TransactionClient } from '../../config/db';

export const signup: MutationResolvers['signup'] = async (_, args, context) => {
  const existingUser = await context.client.user.findFirst({
    where: {
      email: args.input.email
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
    await sendVerificationEmail(args.input.email);
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
          salt: salt,
          isVerified: false,
          projects: {},
          teams: {},
        },
      });
      await prisma.userProfile.create({
        data: {
          user: {
            connect: {
              id: user.id
            }
          },
          avatar: null,
          social: {}
        },
      });
    });
  }
  catch (e) {
    throw new Error("Unable to create user");
  }

  return {
    message: "user signup complete",
    status: 200,
    success: true
  };
}
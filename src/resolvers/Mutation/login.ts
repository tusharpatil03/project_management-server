import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../../utility/auth';
import { client } from '../../db';
import { Role } from '@prisma/client';

export interface InterfaceUser {
  id: string;
  email: string;
  username: string;
  password: string;
  salt: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  goal: string;
  plan: string;
  status: string;
  tasks: [] | null;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  creator: InterfaceUser;
}

export interface InterfaceUserProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  phone: string | null;
  gender: string | null;
  social: {
    id: string;
    github: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  createdAt: Date;
  updatedAt: Date;
  user: InterfaceUser;
}

export const login: MutationResolvers['login'] = async (_, args, context) => {
  const user = await client.user.findUnique({
    where: { email: args.input.email },
    include: {
      profile: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('User does not exist');
  }

  const userProfile = await client.userProfile.findUnique({
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
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
  };

  const accessToken = createAccessToken(accessTokenPayload);

  return {
    user,
    userProfile,
    accessToken,
  };
};

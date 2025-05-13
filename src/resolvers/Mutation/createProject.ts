import { MemberRole } from '@prisma/client';
import { client } from '../../db';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';

interface CreateProjectInput {
  name: string;
  description?: string | null;
  goal?: string | null;
  plan?: string | null;
}

export const createProject: MutationResolvers['createProject'] = async (
  _,
  args,
  context
) => {
  try {
    await client.$transaction(async (prisma) => {
      const creator = await prisma.user.findUnique({
        where: {
          id: context.authData.userId,
        },
      });

      if (!creator) {
        throw new Error('Unauthorized: Creator not found');
      }

      const project = await prisma.project.create({
        data: {
          name: args.input.name,
          description: args.input.description,
          creatorId: context.authData.userId,
          key: args.input.key,
        },
        select: {
          id: true,
        },
      });

      await prisma.userTeam.create({
        data: {
          userId: context.authData.userId,
          teamId: project.id,
          role: MemberRole.Admin,
        },
      });
    });
  } catch {
    throw new Error('Error creating project');
  }

  const project = await client.project.findUnique({
    where: {
      key: args.input.key,
    },
    select: {
      id: true,
      name: true,
      creatorId: true,
      key: true,
    },
  });

  if (!project) {
    throw new Error('Error creating project');
  }

  return project;
};

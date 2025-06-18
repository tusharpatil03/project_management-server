import { MutationResolvers } from '../../types/generatedGraphQLTypes';


export const createProject: MutationResolvers['createProject'] = async (
  _,
  args,
  context
) => {
  try {
    await context.client.$transaction(async (prisma) => {
      const creator = await prisma.user.findUnique({
        where: {
          id: context.userId,
        },
      });

      if (!creator) {
        throw new Error('Unauthorized: Creator not found');
      }

      const project = await prisma.project.create({
        data: {
          name: args.input.name,
          description: args.input.description,
          creator: {
            connect: {
              id: context.userId
            }
          },
          key: args.input.key,
        },
        select: {
          id: true,
        },
      });

    });
  } catch {
    throw new Error('Error creating project');
  }

  const project = await context.client.project.findUnique({
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

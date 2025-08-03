import { PrismaClientType, TransactionClient } from '../../db';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';


export const createProject: MutationResolvers['createProject'] = async (
  _,
  args,
  context
) => {

  if (!context.userId) {
    throw new Error("you are not authorized");
  }

  const existingProject = await context.client.project.findFirst({
    where: {
      key: args.input.key
    }
  });

  if (existingProject) {
    throw new Error("project with key already exist")
  }

  try {
    await context.client.$transaction(async (prisma: TransactionClient) => {
      const creator = await prisma.user.findUnique({
        where: {
          id: context.userId,
        },
      });

      if (!creator) {
        throw new Error('Unauthorized: Creator not found');
      }

      const team = await prisma.team.findFirst({
        where: {
          creatorId: context.userId
        }
      });

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

      if (team && project) {
        await prisma.projectTeam.create({
          data: {
            team: {
              connect: {
                id: team.id
              }
            },
            project: {
              connect: {
                id: project.id
              }
            }
          }
        })
      }

    });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`${e.message}`);
    }
    console.log(e);
  }

  const project = await context.client.project.findFirst({
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

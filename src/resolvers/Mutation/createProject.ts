import { Prisma } from '@prisma/client';
import { client } from '../../db';
import { MutationResolvers, Project } from '../../types/generatedGraphQLTypes';

interface CreateProjectInput {
  name: string;
  description?: string | null;
  goal?: string | null;
  plan?: string | null;
}

export const createProject: MutationResolvers['createProject'] = async (
  _,
  args: { input: CreateProjectInput },
  context: { authData: { userId: string } }
): Promise<Project> => {
  const { input } = args;

  try {
    
    await client.$transaction(async (prisma) => {
      const project = await prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
          goal: input.goal,
          plan: input.plan,
          creator: {
            connect: {
              id: context.authData.userId,
            },
          },
        },
      });

      if (!project) {
        throw new Error('Project creation failed');
      }

      await prisma.user.update({
        where: {
          id: context.authData.userId,
        },
        data: {
          projects: {
            connect: {
              id: project.id,
            },
          },
        },
      });

      await prisma.projectTeam.create({
        data: {
          project: {
            connect: {
              id: project.id,
            },
          },
          team: {
            connect: {
              id: context.authData.userId,
            },
          },
        },
      });
      await prisma.userTeam.create({
        data: {
          user: {
            connect: {
              id: context.authData.userId,
            },
          },
          team: {
            connect: {
              id: context.authData.userId,
            },
          },
        },
      });

    });

    await client.$disconnect();
    const project = await client.project.findUnique({
      where: { id: context.authData.userId },
      include: {
        creator: {
          include: {
            profile: true,
          },
        },
        tasks: {
          include: {
            assignee: {
              include: {
                profile: true,
              },
            },
          },
        },
        sprints: {
          include: {
            tasks: {
              include: {
                assignee: true,
              },
            },
          },
        },
      },
    });
    if (!project) {
      throw new Error('Unable to fetch created project');
    }

    return project;
  } catch (e) {
    console.error('Error in creating Project:', e);
    throw new Error('Unable to Create Project');
  }
};

import { Prisma, Role } from '@prisma/client';
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
    const project = await client.$transaction(async (prisma) => {
      // Create the project
      const createdProject = await prisma.project.create({
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

      // Create a team for the project creator
      const createdTeam = await prisma.team.create({
        data: {
          name: `${input.name} Team`,
          creator: {
            connect: {
              id: context.authData.userId,
            },
          },
        },
      });

      // Link the team to the project
      await prisma.projectTeam.create({
        data: {
          project: {
            connect: {
              id: createdProject.id,
            },
          },
          team: {
            connect: {
              id: createdTeam.id,
            },
          },
        },
      });

      // Add the creator to the team
      await prisma.userTeam.create({
        data: {
          user: {
            connect: {
              id: context.authData.userId,
            },
          },
          team: {
            connect: {
              id: createdTeam.id,
            },
          },
          role: Role.Admin,
        },
      });

      return createdProject;
    });

    // Fetch the created project with all relations for the response
    const fetchedProject = await client.project.findUnique({
      where: { id: project.id },
      include: {
        creator: true,
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

    if (!fetchedProject) {
      throw new Error('Unable to fetch created project');
    }

    return fetchedProject;
  } catch (e) {
    console.error('Error in creating Project:', e);
    throw new Error('Unable to Create Project');
  }
};

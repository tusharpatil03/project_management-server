import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';
import { PrismaClientType, TransactionClient } from '../../db';

export const removeProject: MutationResolvers['removeProject'] = async (
  _,
  args,
  context
) => {
  try {
    const project = await context.client.project.findUnique({
      where: {
        id: args.projectId,
      },
      select: {
        id: true,
        creatorId: true,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    if (project.creatorId !== context.userId) {
      throw new UnauthorizedError(
        'You are not authorized to delete this project',
        '403'
      );
    }

    await context.client.$transaction(async (prisma: TransactionClient) => {
      await prisma.issue.deleteMany({
        where: {
          projectId: args.projectId,
        },
      });

      await prisma.sprint.deleteMany({
        where: {
          projectId: args.projectId,
        },
      });

      await prisma.projectTeam.deleteMany({
        where: {
          projectId: args.projectId,
        },
      });

      const projectTeams = await prisma.projectTeam.findMany({
        where: { projectId: args.projectId },
        select: { teamId: true },
      });

      const teamIds = projectTeams.map((pt) => pt.teamId);

      await prisma.projectTeam.deleteMany({
        where: {
          id: { in: teamIds },
        },
      });

      for (let team in teamIds) {
        await prisma.team.update({
          where: { id: teamIds[team] },
          data: {
            projects: {
              disconnect: {
                id: args.projectId,
              },
            },
          },
        });
      }

      await prisma.project.delete({
        where: {
          id: args.projectId,
        },
      });
    });
  } catch (error) {
    throw new Error("Unable to delete project")
  }

  return {
    success: true,
    status: 200,
    message: 'Project deleted successfully',
  };
};

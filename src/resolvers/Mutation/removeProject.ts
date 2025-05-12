import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { client } from '../../db';
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';

export const removeProject: MutationResolvers['removeProject'] = async (
  _,
  args,
  context
) => {
  try {
    const project = await client.project.findUnique({
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

    if (project.creatorId !== context.authData.userId) {
      throw new UnauthorizedError(
        'You are not authorized to delete this project',
        '403'
      );
    }

    await client.$transaction(async (prisma) => {
      // Delete tasks associated with the project
      await prisma.task.deleteMany({
        where: {
          projectId: args.projectId,
        },
      });

      // Delete sprints associated with the project
      await prisma.sprint.deleteMany({
        where: {
          projectId: args.projectId,
        },
      });

      // Delete project-team relationships
      await prisma.projectTeam.deleteMany({
        where: {
          projectId: args.projectId,
        },
      });

      // Delete user-team relationships for teams tied to the project
      const projectTeams = await prisma.projectTeam.findMany({
        where: { projectId: args.projectId },
        select: { teamId: true },
      });

      const teamIds = projectTeams.map((pt) => pt.teamId);
      // await prisma.userTeam.deleteMany({
      //   where: {
      //     teamId: { in: teamIds },
      //   },
      // });

      // Delete teams tied to the project
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
            }
          },
        });
      }

      // Finally, delete the project
      await prisma.project.delete({
        where: {
          id: args.projectId,
        },
      });
    });

    return {
      success: true,
      status: 200,
      message: 'Project deleted successfully',
    };
  } catch (error) {
    console.error('Error removing project:', error);
    return {
      success: false,
      status: 500,
      message: 'Failed to remove project',
    };
  }
};

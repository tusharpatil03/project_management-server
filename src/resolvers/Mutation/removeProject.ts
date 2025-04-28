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
      include: {
        sprints: true,
        tasks: true,
        projectTeams: true,
      },
    });

    if (!project) {
      throw new Error('Project Not found');
    }

    if (project.creatorId !== context.authData.userId) {
      throw new UnauthorizedError(
        'You are not the creator of this project',
        '403'
      );
    }

    const operations = [];
    if (project.sprints.length > 0) {
      operations.push(
        client.sprint.deleteMany({
          where: {
            id: {
              in: project?.sprints.map((sprint) => sprint.id),
            },
          },
        })
      );
    }

    if (project.tasks.length > 0) {
      operations.push(
        client.task.deleteMany({
          where: {
            id: {
              in: project.tasks.map((t) => t.id),
            },
          },
        })
      );
    }

    if (project.projectTeams.length > 0) {
      operations.push(
        client.projectTeam.deleteMany({
          where: {
            projectId: project.id,
          },
        })
      );
    }

    operations.push(
      client.project.delete({
        where: {
          id: args.projectId,
        },
      })
    );

    await client.$transaction(operations);

    return {
      success: true,
      status: 200,
    };
  } catch (e) {
    console.error('Error removing project:', e);

    return {
      success: false,
      status: 500,
      message: e instanceof Error ? e.message : 'Internal Server Error',
    };
  }
};

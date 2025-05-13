import _ from 'lodash';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { client } from '../../db';

export const updateTaskStatus: MutationResolvers['updateTaskStatus'] = async (
  _,
  args,
  context
) => {
  try {
    //check wether the user is part of project or not
    const project = await client.project.findUnique({
      where: {
        id: args.projectId,
      },
      select: {
        id: true,
        creatorId: true,
        teams: {
          select: {
            team: {
              select: {
                users: {
                  where: {
                    id: context.authData.userId,
                  },
                },
              },
            },
          },
        },
      },
    });

    const isMember = project?.teams.some((team) => {
      team.team.users.some((user) => user.id === context.authData.userId);
    });

    if (!isMember) {
      throw new Error('User is not part of this project');
    }

    await client.$transaction(async (t) => {
      t.task.update({
        where: {
          id: args.taskId,
        },
        data: {
          status: args.status,
        },
      });
    });
  } catch (e) {
    throw new Error('Unable to Update Task');
  }

  return {
    message: 'Task Updated',
    success: true,
  };
};

import _ from 'lodash';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { InterfaceUserTeam } from './createTeam';
import { Team } from './assignTask';
import { PrismaClientType } from '../../db';
export const updateTaskStatus: MutationResolvers['updateTaskStatus'] = async (
  _,
  args,
  context
) => {

  try {
    //check wether the user is part of project or not
    const project = await context.client.project.findUnique({
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

    const isMember = project?.teams.some((team: Team) => {
      team.team.users.some((user: InterfaceUserTeam) => user.id === context.authData.userId);
    });

    if (!isMember) {
      throw new Error('User is not part of this project');
    }

    await context.client.$transaction(async (t: PrismaClientType) => {
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

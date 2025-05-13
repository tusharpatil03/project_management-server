import _, { assign } from 'lodash';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { client } from '../../db';
import { MemberRole, Prisma } from '@prisma/client';

export const assineTask: MutationResolvers['assineTask'] = async (
  _,
  args,
  context
) => {
  try {
    const assignee = await client.user.findUnique({
      where: { id: args.input.assigneeId },
      select: {
        id: true,
      },
    });

    if (!assignee) {
      throw new Error(`Assignee Not Found with id: ${args.input.assigneeId}`);
    }

    const project = await client.project.findUnique({
      where: { id: args.input.projectId },
      include: {
        tasks: {
          where: {
            id: args.input.taskId,
          },
          select: {
            id: true,
            assigneeId: true,
            projectId: true,
          },
        },
        teams: {
          select: {
            team: {
              select: {
                id: true,
                users: {
                  where: {
                    userId: assignee.id,
                  },
                  select: {
                    id: true,
                    userId: true,
                    role: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!project) {
      throw new Error(`Project Not Found with id: ${args.input.projectId}`);
    }
    if (project.tasks.length === 0) {
      throw new Error(`Task Not Found with id: ${args.input.taskId}`);
    }
    const task = project.tasks[0];
    if (task.assigneeId === args.input.assigneeId) {
      throw new Error('Task is already assigned to this user');
    }
    if (task.projectId !== args.input.projectId) {
      throw new Error('Task does not belong to this project');
    }

    let role = null;

    const isMember = project.teams.some((team) =>
      team.team.users.some((user) => {
        if (user.userId === assignee.id) {
          role = user.role;
          return true;
        }
      })
    );
    if (!isMember) {
      throw new Error('Assignee is not a member of the project');
    }

    if (role === MemberRole.Viewer) {
      throw new Error('Assignee is not a contributor of this project');
    }

    await client.$transaction(async (prisma) => {
      await prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          assignee: {
            connect: {
              id: assignee.id,
            },
          },
        },
      });

      await prisma.user.update({
        where: {
          id: assignee.id,
        },
        data: {
          assignedTasks: {
            connect: {
              id: task.id,
            },
          },
        },
      });
    });
  } catch (e) {
    console.log('Task Assing Error: ', e);
    throw new Error('Failed to assign Task');
  }

  return {
    message: 'tasks assigned successfully',
    success: true,
  };
};

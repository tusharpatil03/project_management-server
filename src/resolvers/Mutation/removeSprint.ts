import { client } from '../../db';
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';

export const removeSprint: MutationResolvers['removeSprint'] = async (
  _,
  args,
  context
) => {
  const project = await client.project.findUnique({
    where: {
      id: args.projectId,
    },
    include: { sprints: true },
  });

  if (!project) {
    throw new Error('Project Does not Exist');
  }

  const sprintId = project.sprints.some((s) => s.id == args.sprintId);

  if (!sprintId) {
    throw new Error('Sprint is not part of this Project');
  }
  const sprint = await client.sprint.findUnique({
    where: { id: args.sprintId },
    include: {
      tasks: {
        select: {
          id: true,
          assignee: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!sprint) {
    throw new Error('Sprint Not Found');
  }

  const isAuthorized =
    context.authData.userId === sprint.creatorId ||
    context.authData.userId === project.creatorId;

  if (!isAuthorized) {
    throw new UnauthorizedError(
      'You are not authorized to remove this Sprint',
      '403'
    );
  }

  try {
    await client.$transaction(async (prisma) => {
      const assigneeTaskMap: Record<string, { id: string }[]> = {};

      for (const task of sprint.tasks) {
        if (task.assignee?.id) {
          const assigneeId = task.assignee.id;
          if (!assigneeTaskMap[assigneeId]) {
            assigneeTaskMap[assigneeId] = [];
          }
          assigneeTaskMap[assigneeId].push({ id: task.id });
        }
      }

      for (const [assigneeId, tasks] of Object.entries(assigneeTaskMap)) {
        await prisma.user.update({
          where: { id: assigneeId },
          data: {
            assignedTasks: {
              disconnect: tasks,
            },
          },
        });
      }

      if (sprint.tasks.length > 0) {
        await prisma.task.deleteMany({
          where: {
            id: {
              in: sprint.tasks.map((t) => t.id),
            },
          },
        });
      }

      await prisma.sprint.delete({
        where: {
          id: args.sprintId,
        },
      });
    });

    return {
      success: true,
      status: 200,
    };
  } catch (e) {
    console.error('Delete Sprint Failed:', e);
    throw new Error('Transaction Failed');
  }
};

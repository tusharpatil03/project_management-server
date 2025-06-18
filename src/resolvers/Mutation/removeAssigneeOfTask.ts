import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { PrismaClientType } from '../../db';

export const removeAssineeOfTask: MutationResolvers['removeAssineeOfTask'] =
  async (_, args, context) => {
    try {
      return await context.client.$transaction(async (prisma) => {
        const task = await prisma.task.findFirst({
          where: {
            id: args.taskId,
            creatorId: context.userId,
          },
        });

        if (!task) {
          throw new Error('Task not Found');
        }

        if (task.creatorId !== context.userId) {
          throw new UnauthorizedError(
            'You are not creator of this task',
            '403'
          );
        }

        if (task.assigneeId === null) {
          throw new Error('Task does not have an assignee');
        }
        // Check if the task is part of the project
        const project = await prisma.project.findUnique({
          where: { id: task.projectId },
          include: { tasks: true },
        });
        if (!project) {
          throw new Error('Project does not exist');
        }
        const taskInProject = project.tasks.some((t) => t.id === task.id);
        if (!taskInProject) {
          throw new Error('Task is not part of this project');
        }

        await prisma.user.update({
          where: { id: task.assigneeId },
          data: {
            assignedTasks: {
              disconnect: { id: task.id },
            },
          },
        });

        const updatedTask = await prisma.task.update({
          where: { id: task.id },
          data: {
            assigneeId: null,
            assignee: undefined,
          },
        });

        return updatedTask;
      });
    } catch (error) {
      // Optionally, log the error here
      throw error instanceof Error
        ? error
        : new Error('Failed to remove assignee from task');
    }
  };

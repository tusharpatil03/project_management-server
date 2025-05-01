import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { client } from '../../db';
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';

export const removeTask: MutationResolvers['removeTask'] = async (
  _,
  args,
  context
) => {
  const { taskId, projectId } = args;

  try {
    return await client.$transaction(async (prisma) => {
      // Fetch the task with its project
      const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: { project: true },
      });

      if (!task || task.projectId !== projectId) {
        throw new Error('Task is not part of this project');
      }

      // Fetch the project to verify the creator
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        throw new Error('Project does not exist');
      }

      // Authorization checks
      if (
        task.creatorId !== context.authData.userId &&
        project.creatorId !== context.authData.userId
      ) {
        throw new UnauthorizedError(
          'You are not authorized to remove this task',
          '403'
        );
      }

      // Disconnect task from sprint if it belongs to one
      if (task.sprintId) {
        await prisma.sprint.update({
          where: { id: task.sprintId },
          data: {
            tasks: {
              disconnect: { id: taskId },
            },
          },
        });
      }

      // Disconnect task from assignee if it has one
      if (task.assigneeId) {
        await prisma.user.update({
          where: { id: task.assigneeId },
          data: {
            assignedTasks: {
              disconnect: { id: taskId },
            },
          },
        });
      }

      // Delete the task (this automatically removes it from the project)
      await prisma.task.delete({
        where: { id: taskId },
      });

      return {
        success: true,
        message: 'Task removed successfully.',
        status: 200,
      };
    });
  } catch (error) {
    console.error('Error removing task:', error);
    throw new Error('Unable to delete task');
  }
};

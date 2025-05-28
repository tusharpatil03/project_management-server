import { SprintStatus, TaskStatus } from '@prisma/client';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';

export interface InterfaceSprint {
  id: string;
  title: string;
  description: string;
  status: SprintStatus;
  dueDate: Date;
}

export const createSprint: MutationResolvers['createSprint'] = async (
  _,
  args,
  context
) => {
  const input = args.input;

  // Validate user authentication
  if (!context.authData?.userId) {
    throw new Error('Unauthorized: User must be logged in to create a sprint.');
  }

  try {
    const sprint = await context.client.sprint.create({
      data: {
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        creatorId: context.authData.userId,
        project: {
          connect: {
            id: input.projectId,
          },
        },
      },
      include: {
        project: true,
        tasks: true,
      },
    });

    // Prepare tasks with the created sprint ID
    if (input.tasks && input.tasks.length > 0) {
      const tasksInput = input.tasks.map((task) => ({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        creatorId: context.authData.userId,
        projectId: input.projectId,
        sprintId: sprint.id,
        assigneeId: task.assigneeId,
      }));

      // Create tasks
      await context.client.task.createMany({
        data: tasksInput,
        skipDuplicates: true,
      });
    }

    return sprint;
  } catch (error: any) {
    console.error('Error in Creating Sprint:', error.message);
    throw new Error(`Unable to create Sprint: ${error.message}`);
  }
};

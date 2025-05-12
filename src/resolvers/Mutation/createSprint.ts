import { SprintStatus, TaskStatus } from '@prisma/client';
import { client } from '../../db';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';

export interface InterfaceSprint {
  id: string;
  title: string;
  description: string;
  status: SprintStatus; // Fixed type to SprintStatus
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

    // Create the sprint
    const sprint = await client.sprint.create({
      data: {
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        status: input.status || SprintStatus.Planned,
        creatorId: context.authData.userId,
        project: {
          connect: {
            id: input.projectId,
          },
        }
      },
      include: {
        project: true,
        tasks: true,
      }
    });

    // Prepare tasks with the created sprint ID
    if (input.tasks && input.tasks.length > 0) {
      const tasksInput = input.tasks.map((task) => ({
        title: task.title,
        description: task.description,
        status: task.status || TaskStatus.TODO,
        dueDate: task.dueDate,
        creatorId: context.authData.userId,
        projectId: input.projectId,
        sprintId: sprint.id,
        assigneeId: task.assigneeId,
      }));

      // Create tasks
      await client.task.createMany({
        data: tasksInput,
      });
    }

    return sprint; // Removed unnecessary sprint update for task connection
  } catch (error: any) {
    console.error('Error in Creating Sprint:', error.message); // Improved error logging
    throw new Error(`Unable to create Sprint: ${error.message}`); // More specific error message
  }
};

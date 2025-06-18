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

  const creatorId:string = context.userId;

  try {
    const sprint = await context.client.sprint.create({
      data: {
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        creatorId: context.userId,
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

    type TaskInput = {
      title: string,
      description: string | undefined | null,
      dueDate: string,
      creatorId: string,
      projectId: string,
      sprintId: string,
      assigneeId: string | null | undefined
    }

    // Prepare tasks with the created sprint ID
    if (input.tasks && input.tasks.length > 0) {
      const tasksInput:TaskInput[] = input.tasks.map((task):TaskInput => ({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        creatorId: creatorId,
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

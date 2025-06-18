import { TaskStatus } from '@prisma/client';
import { MutationResolvers, User } from '../../types/generatedGraphQLTypes';
import { PrismaClientType } from '../../db';

// Align InterfaceTask with GraphQL Task type
export interface InterfaceTask {
  id: string;
  title: string;
  description: string | null;
  creator: User;
  assignee: User | null;
  projectId: string;
  sprintId: string | null;
  createdAt: string;
  updatedAt: string;
  status: TaskStatus;
  dueDate: string | null;
}

export const createTask: MutationResolvers['createTask'] = async (
  _,
  args,
  context
) => {
  const { input } = args;

  const status: TaskStatus = Object.values(TaskStatus).includes(
    input.status as TaskStatus
  )
    ? (input.status as TaskStatus)
    : TaskStatus.TODO;

  try {
    return await context.client.$transaction(async (prisma) => {
      const creator = await prisma.user.findUnique({
        where: {
          id: context.userId,
        },
      });

      if (!creator) {
        throw new Error('Unauthorized: Creator not found');
      }

      if (input.assigneeId) {
        await prisma.user.findUniqueOrThrow({
          where: {
            id: input.assigneeId,
          },
        });
      }

      await prisma.project.findUniqueOrThrow({
        where: {
          id: input.projectId,
        },
      });

      const task = await prisma.task.create({
        data: {
          title: input.title,
          description: input.description,
          dueDate: input.dueDate,
          status: status,
          ...(input.assigneeId && {
            assignee: {
              connect: { id: input.assigneeId },
            },
          }),
          creatorId: context.userId,
          project: {
            connect: {
              id: input.projectId,
            },
          },
          ...(input.sprintId && {
            sprint: {
              connect: { id: input.sprintId },
            },
          }),
        },
        include: {
          assignee: {
            include: {
              profile: true,
            },
          },
        },
      });

      if (!task) {
        throw new Error('Task creation failed');
      }

      // Remove redundant connect calls for tasks
      if (input.sprintId) {
        await prisma.sprint.update({
          where: {
            id: input.sprintId,
          },
          data: {
            tasks: {
              connect: {
                id: task.id,
              },
            },
          },
        });
      }

      if (input.assigneeId) {
        await prisma.user.update({
          where: {
            id: input.assigneeId,
          },
          data: {
            assignedTasks: {
              connect: {
                id: task.id,
              },
            },
          },
        });
      }

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        creatorId: task.creatorId,
        assignee: task.assignee,
        projectId: task.projectId,
        sprintId: task.sprintId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        status: task.status,
        dueDate: task.dueDate,
      };
    });
  } catch (e) {
    console.error('Error in creating Task:', e);
    throw new Error('Unable to create Task');
  }
};

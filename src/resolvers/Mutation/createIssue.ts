import { IssueStatus, IssueType } from '@prisma/client';
import { MutationResolvers, User } from '../../types/generatedGraphQLTypes';
import { client, TransactionClient } from '../../db';

export interface InterfaceIssue {
  id: string;
  title: string;
  description: string | null;
  creator: User;
  assignee: User | null;
  projectId: string;
  sprintId: string | null;
  createdAt: string;
  updatedAt: string;
  status: IssueStatus;
  dueDate: string | null;
}

const validateParent = async (parentId: string | undefined, projectId: string, issueType: IssueType): Promise<boolean> => {
  if (!parentId || issueType === IssueType.EPIC) {
    return false;
  }

  const parent = await client.issue.findUnique({
    where: {
      id: parentId,
    },
    select: {
      id: true,
      projectId: true,
      type: true,
      parentId: true,
    }
  });

  if (!parent) {
    throw new Error("Parent Does not exist")
  }
  if (parent.projectId !== projectId) {
    throw new Error("Parent is from different project")
  }
  if (parent.type === IssueType.TASK || parent.type === IssueType.BUG) {
    throw new Error("Task or Bug can be parent")
  }

  if (parent.type === issueType) {
    throw new Error("Same Types cannot be nested")
  }

  if (parent.parentId) {
    const grandParent = await client.issue.findFirst({
      where: {
        id: parent.parentId,
      },
      select: {
        type: true
      }
    });

    if (grandParent?.type !== IssueType.EPIC) {
      throw new Error("Gandparent can be EPIC only")
    }
  }

  return true;
}

export const createIssue: MutationResolvers['createIssue'] = async (
  _,
  args,
  context
) => {
  const { input } = args;

  const status: IssueStatus = Object.values(IssueStatus).includes(
    input.status as IssueStatus
  )
    ? (input.status as IssueStatus)
    : IssueStatus.TODO;

  const validParent = await validateParent(input.parentId as string, input.projectId, input.type);

  if (input.parentId && !validParent) {
    throw new Error("Not valid parent")
  }


  return await context.client.$transaction(async (prisma: TransactionClient) => {
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

    const issue = await prisma.issue.create({
      data: {
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        type: input.type as IssueType,
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
        ...((validParent && input.parentId) && {
          parent: {
            connect: {
              id: input.parentId
            }
          }
        })
      },
      include: {
        assignee: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!issue) {
      throw new Error('Issue creation failed');
    }

    try {
      if (input.sprintId) {
        await prisma.sprint.update({
          where: {
            id: input.sprintId,
          },
          data: {
            issues: {
              connect: {
                id: issue.id,
              },
            },
          },
        });
      }

    }
    catch (e) {
      throw new Error("Failed to update Sprint");
    }

    try {
      if (input.assigneeId) {
        await prisma.user.update({
          where: {
            id: input.assigneeId,
          },
          data: {
            assignedIssues: {
              connect: {
                id: issue.id,
              },
            },
          },
        });
      }
    } catch (e) {
      throw new Error("Failed to update user")
    }

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      creatorId: issue.creatorId,
      assignee: issue.assignee,
      projectId: issue.projectId,
      sprintId: issue.sprintId,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
      status: issue.status,
      dueDate: issue.dueDate,
    };
  });
};

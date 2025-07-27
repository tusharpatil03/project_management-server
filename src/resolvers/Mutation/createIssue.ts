import { IssueStatus, IssueType } from '@prisma/client';
import { CreateIssueInput, MutationResolvers, User } from '../../types/generatedGraphQLTypes';
import { client, TransactionClient } from '../../db';
import { createNewIssue, IssueCreateInput } from '../../services/Issue/CreateIssue';

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

  // const status: IssueStatus = Object.values(IssueStatus).includes(
  //   input.status as IssueStatus
  // )
  //   ? (input.status as IssueStatus)
  //   : IssueStatus.TODO;

  const validParent = await validateParent(input.parentId as string, input.projectId, input.type);

  if (input.parentId && !validParent) {
    throw new Error("Not valid parent")
  }


  if (input.assigneeId) {
    await context.client.user.findUniqueOrThrow({
      where: {
        id: input.assigneeId,
      },
    });
  }

  await context.client.project.findUniqueOrThrow({
    where: {
      id: input.projectId,
    },
  });

  const data: IssueCreateInput = {
    ...args.input,
    creatorId: context.userId
  };

  try {
    await createNewIssue(data);
  } catch (e) {
    throw new Error('Issue creation failed');
  }

  return {
    message: "Issue Created Successfully",
    success: true,
  }
};

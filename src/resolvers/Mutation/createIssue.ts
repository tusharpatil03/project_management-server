import {   IssueStatus, IssueType } from '@prisma/client';
import {  MutationResolvers, User } from '../../types/generatedGraphQLTypes';
import { client, } from '../../db/db';
import { createNewIssue, IssueCreateInput } from '../../services/Issue/CreateIssue';
import { buildActivityData  } from '../../services/Activity/Create';

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

  
  //check assignee exists
  if (input.assigneeId) {
    await context.client.user.findUniqueOrThrow({
      where: {
        id: input.assigneeId,
      },
    });
  }

  //check project exist
  const project = await context.client.project.findUniqueOrThrow({
    where: {
      id: input.projectId,
    },
    select: {
      key: true,
    }
  });

  //for unique key issue count is taken
  const issueCount = await context.client.issue.count();
  const key = `${project.key}${issueCount}`;

  //input for create issue
  const data: IssueCreateInput = {
    ...args.input,
    key: key,
    creatorId: context.userId
  };

  try {
    //create new issue
    await createNewIssue(data);
  } catch (e) {
    throw new Error('failed to create Issue');
  }

  return {
    message: "Issue Created Successfully",
    success: true,
  }
};

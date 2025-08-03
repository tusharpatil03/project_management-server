import { IssueType, SprintStatus } from '@prisma/client';
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

  const sprintCount = await context.client.sprint.count();
  const key = `Sprint${sprintCount+1}`;
  
  try {
    const sprint = await context.client.sprint.create({
      data: {
        title: input.title,
        description: input.description,
        key: key,
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
        issues: true,
      },
    });

    if (input.issues && input.issues.length > 0) {
      for (let issue of input.issues) {
        if (
          (issue?.type === IssueType.TASK || issue?.type === IssueType.BUG) &&
          issue.id
        ) {
          await context.client.issue.update({
            where: {
              id: issue.id
            },
            data: {
              sprint: {
                connect: {
                  id: sprint.id
                }
              }
            }
          })
        }
      }
    }

    // type IssueInput = {
    //   title: string,
    //   description: string | undefined | null,
    //   dueDate: string,
    //   type: IssueType,
    //   creatorId: string,
    //   projectId: string,
    //   sprintId: string,
    //   assigneeId: string | null | undefined
    // }

    // // Prepare Issues with the created sprint ID
    // if (input.issues && input.issues.length > 0) {
    //   const issuesInput: IssueInput[] = input.issues.map((issue): IssueInput => ({
    //     title: issue.title,
    //     description: issue.description,
    //     dueDate: issue.dueDate,
    //     type: issue.type,
    //     creatorId: creatorId,
    //     projectId: input.projectId,
    //     sprintId: sprint.id,
    //     assigneeId: issue.assigneeId,
    //   }));

    //   // Create issues
    //   await context.client.issue.createMany({
    //     data: issuesInput,
    //     skipDuplicates: true,
    //   });
    // }


  } catch (error: any) {
    console.error('Error in Creating Sprint:', error.message);
    throw new Error(`Unable to create Sprint`);
  }

  return {
    message: "Sprint Created",
    success: true
  }
};

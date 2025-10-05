import { ActivityAction, EntityType, IssueType, SprintStatus } from '@prisma/client';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { buildActivityData, CreateActivityInput } from '../../services/Activity/Create';
import { client } from '../../db/db';

export interface InterfaceSprint {
  id: string;
  title: string;
  description: string;
  status: SprintStatus;
  dueDate: Date;
}

//this resolver will create new sprint and return created sprint
export const createSprint: MutationResolvers['createSprint'] = async (
  _,
  args,
  context
) => {
  const input = args.input;

  //the sprint count is consider to make key unique
  const sprintCount = await context.client.sprint.count();
  const key = `Sprint${sprintCount + 1}`;

  let sprintId: string | null = "";
  let sprintKey: string | null = "";

  const project = await context.client.project.findUnique({
    where: {
      id: args.input.projectId,
    }
  });

  if (!project) {
    throw new Error("Project Not Found");
  }

  //create a sprint
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
      select: {
        id: true,
        key: true,
      }
    });

    sprintId = sprint.id;
    sprintKey = sprint.key;

    //if existing issue ids are provided in input by user, then add it in this sprint
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

  //create activity
  const createActivityInput: CreateActivityInput = {
    action: ActivityAction.SPRINT_CREATED,
    entityType: EntityType.SPRINT,
    entityId: sprintId,
    entityName: sprintKey,
    description: "new sprint created",
    userId: context.userId,
    projectId: args.input.projectId
  }
  try {
    await client.activity.create({
      data: buildActivityData(createActivityInput)
    });
  } catch (e) {
    console.log("Failed to create activity", e);
  }

  return {
    message: "Sprint Created",
    success: true
  }
};

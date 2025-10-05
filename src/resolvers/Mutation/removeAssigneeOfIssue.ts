import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { client, TransactionClient } from '../../db/db';
import { InterfaceUserRole, isUserPartOfProject } from '../Query/allSprints';
import { buildActivityData, CreateActivityInput } from '../../services/Activity/Create';
import { ActivityAction, EntityType, Issue } from '@prisma/client';

export const removeAssineeOfIssue: MutationResolvers['removeAssineeOfIssue'] =
  async (_, args, context) => {

    const issue = await context.client.issue.findFirst({
      where: {
        id: args.issueId
      }
    });

    if (!issue) {
      throw new Error("Issue not found");
    }

    const isPartOfProject: InterfaceUserRole = await isUserPartOfProject(context.userId, issue.projectId, context.client)
    if (issue.creatorId !== context.userId) {
      if (!isPartOfProject) {
        throw new Error("Unauthorized access")
      }
    }

    if (issue.assigneeId === null) {
      throw new Error('issue does not have an assignee');
    }

    const project = await context.client.project.findUnique({
      where: { id: issue.projectId },
      include: { issues: true },
    });

    if (!project) {
      throw new Error('Project does not exist');
    }

    const issueInProject = project.issues.some((t: Issue) => t.id === issue.id);

    if (!issueInProject) {
      throw new Error('issue is not part of this project');
    }

    try {
      await context.client.$transaction(async (prisma: TransactionClient) => {
        await prisma.user.update({
          where: { id: issue.assigneeId as string },
          data: {
            assignedIssues: {
              disconnect: { id: issue.id },
            },
          },
        });

        await prisma.issue.update({
          where: { id: issue.id },
          data: {
            assigneeId: null,
            assignee: undefined,
          },
        });

      });
    } catch (e) {
      console.log(e);
      throw new Error("Unable to remove assignee")
    }

    //create activity
    const createActivityInput: CreateActivityInput = {
      action: ActivityAction.ISSUE_ASSIGNED,
      entityType: EntityType.ISSUE,
      entityId: issue.id,
      entityName: issue.id,
      description: `issue assigned ${issue.key}`,
      userId: context.userId,
      issueId: issue.id,
      projectId: issue.projectId,
    }
    try {
      await client.activity.create({
        data: buildActivityData(createActivityInput)
      });
    } catch (e) {
      console.log("Failed to create activity", e);
    }

    return {
      message: "assignee removed",
      success: true,
    }
  }

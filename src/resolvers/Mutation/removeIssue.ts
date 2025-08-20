import { MutationResolvers, RemoveIssueInput } from '../../types/generatedGraphQLTypes';
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';
import { TransactionClient } from '../../db';
import { CreateActivity, CreateActivityInput } from '../../services/Activity/Create';
import { ActivityAction, EntityType } from '@prisma/client';

export const removeIssue: MutationResolvers['removeIssue'] = async (
  _,
  args,
  context
) => {
  const input: RemoveIssueInput = args.input;

  const { issueId, projectId } = input;

  console.log("input:", input);

  try {
    return await context.client.$transaction(async (prisma: TransactionClient) => {
      // fetch the issue with its project
      const issue = await prisma.issue.findUnique({
        where: { id: issueId },
        include: { project: true },
      });

      if (!issue || issue.projectId !== projectId) {
        throw new Error('Issue is not part of this project');
      }

      // fetch the project to verify the creator
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        throw new Error('Project does not exist');
      }

      // Authorization checks
      if (
        issue.creatorId !== context.userId &&
        project.creatorId !== context.userId
      ) {
        throw new UnauthorizedError(
          'You are not authorized to remove this issue',
          '403'
        );
      }

      // disconnect issue from sprint if it belongs to one
      if (issue.sprintId) {
        await prisma.sprint.update({
          where: { id: issue.sprintId },
          data: {
            issues: {
              disconnect: { id: issueId },
            },
          },
        });
      }

      // disconnect issue from assignee if it has one
      if (issue.assigneeId) {
        await prisma.user.update({
          where: { id: issue.assigneeId },
          data: {
            assignedIssues: {
              disconnect: { id: issueId },
            },
          },
        });
      }

      //delete the issue
      await prisma.issue.delete({
        where: { id: issueId },
      });

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
        await CreateActivity(createActivityInput, context.client);
      } catch (e) {
        console.log("Failed to create activity", e);
      }


      return {
        success: true,
        message: 'Issue removed successfully.',
        status: 200,
      };

    });
  } catch (error) {
    console.error('Error removing Issue:', error);
    throw new Error('Unable to delete Issue');
  }
};

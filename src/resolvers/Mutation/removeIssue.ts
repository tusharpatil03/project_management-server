import { MutationResolvers, RemoveIssueInput } from '../../types/generatedGraphQLTypes';
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';
import {  TransactionClient } from '../../db';

export const removeIssue: MutationResolvers['removeIssue'] = async (
  _,
  args,
  context
) => {
  const input:RemoveIssueInput = args.input;

  const { issueId, projectId } = input;

  try {
    return await context.client.$transaction(async (prisma:TransactionClient) => {
      // Fetch the issue with its project
      const issue = await prisma.issue.findUnique({
        where: { id: issueId },
        include: { project: true },
      });

      if (!issue || issue.projectId !== projectId) {
        throw new Error('Issue is not part of this project');
      }

      // Fetch the project to verify the creator
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

      // Disconnect issue from sprint if it belongs to one
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

      // Disconnect issue from assignee if it has one
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

      // Delete the issue (this automatically removes it from the project)
      await prisma.issue.delete({
        where: { id: issueId },
      });
      

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

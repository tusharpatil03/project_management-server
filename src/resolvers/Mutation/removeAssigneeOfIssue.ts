import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { PrismaClientType, TransactionClient } from '../../db';

export const removeAssineeOfIssue: MutationResolvers['removeAssineeOfIssue'] =
  async (_, args, context) => {
    try {
      return await context.client.$transaction(async (prisma:TransactionClient) => {
        const issue = await prisma.issue.findFirst({
          where: {
            id: args.issueId,
            creatorId: context.userId,
          },
        });

        if (!issue) {
          throw new Error('issue not Found');
        }

        if (issue.creatorId !== context.userId) {
          throw new UnauthorizedError(
            'You are not creator of this issue',
            '403'
          );
        }

        if (issue.assigneeId === null) {
          throw new Error('issue does not have an assignee');
        }
        // Check if the issue is part of the project
        const project = await prisma.project.findUnique({
          where: { id: issue.projectId },
          include: { issues: true },
        });
        if (!project) {
          throw new Error('Project does not exist');
        }
        const issueInProject = project.issues.some((t) => t.id === issue.id);
        if (!issueInProject) {
          throw new Error('issue is not part of this project');
        }

        await prisma.user.update({
          where: { id: issue.assigneeId },
          data: {
            assignedIssues: {
              disconnect: { id: issue.id },
            },
          },
        });

        const updatedIssue = await prisma.issue.update({
          where: { id: issue.id },
          data: {
            assigneeId: null,
            assignee: undefined,
          },
        });

        return updatedIssue;
      });
    } catch (error) {
      // Optionally, log the error here
      throw error instanceof Error
        ? error
        : new Error('Failed to remove assignee from issue');
    }
  };

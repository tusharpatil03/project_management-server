import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { TransactionClient } from '../../db';
import { InterfaceUserRole, isUserPartOfProject } from '../Query/allSprints';

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

    const issueInProject = project.issues.some((t) => t.id === issue.id);

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

    return {
      message: "assignee removed",
      success: true,
    }
  }

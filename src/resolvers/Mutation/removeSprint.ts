import { PrismaClientType, TransactionClient } from '../../db/db';
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError';
import { MutationResolvers, RemoveSprintInput } from '../../types/generatedGraphQLTypes';
import { InterfaceSprint } from './createSprint';
import { InterfaceIssue } from './createIssue';
import { CreateActivity, CreateActivityInput } from '../../services/Activity/Create';
import { ActivityAction, EntityType } from '@prisma/client';

export const removeSprint: MutationResolvers['removeSprint'] = async (
  _,
  args,
  context
) => {
  const input: RemoveSprintInput = args.input;

  const project = await context.client.project.findUnique({
    where: {
      id: input.projectId,
    },
    include: { sprints: true },
  });

  if (!project) {
    throw new Error('Project Does not Exist');
  }

  const sprintId = project.sprints.some((s) => s.id == input.sprintId);

  if (!sprintId) {
    throw new Error('Sprint is not part of this Project');
  }
  const sprint = await context.client.sprint.findUnique({
    where: { id: input.sprintId },
    include: {
      issues: {
        select: {
          id: true,
          assignee: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!sprint) {
    throw new Error('Sprint Not Found');
  }

  const isAuthorized =
    context.userId === sprint.creatorId ||
    context.userId === project.creatorId;

  if (!isAuthorized) {
    throw new UnauthorizedError(
      'You are not authorized to remove this Sprint',
      '403'
    );
  }

  try {
    await context.client.$transaction(async (prisma: TransactionClient) => {
      const assigneeIssueMap: Record<string, { id: string }[]> = {};

      for (const issue of sprint.issues) {
        if (issue.assignee?.id) {
          const assigneeId = issue.assignee.id;
          if (!assigneeIssueMap[assigneeId]) {
            assigneeIssueMap[assigneeId] = [];
          }
          assigneeIssueMap[assigneeId].push({ id: issue.id });
        }
      }

      for (const [assigneeId, issues] of Object.entries(assigneeIssueMap)) {
        await prisma.user.update({
          where: { id: assigneeId },
          data: {
            assignedIssues: {
              disconnect: issues,
            },
          },
        });
      }

      if (sprint.issues.length > 0) {
        await prisma.issue.deleteMany({
          where: {
            id: {
              in: sprint.issues.map((t) => t.id),
            },
          },
        });
      }

      await prisma.sprint.delete({
        where: {
          id: input.sprintId,
        },
      });

      //create activity
      const createActivityInput: CreateActivityInput = {
        action: ActivityAction.SPRINT_REMOVED,
        entityType: EntityType.PROJECT,
        entityId: project.id,
        entityName: project.key,
        description: `sprint removed from project${project.key}`,
        userId: context.userId,
        projectId: project.id,
      }
      try {
        await CreateActivity(createActivityInput, context.client);
      } catch (e) {
        console.log("Failed to create activity", e);
      }
    });

    return {
      success: true,
      status: 200,
    };
  } catch (e) {
    console.error('Delete Sprint Failed:', e);
    throw new Error('Transaction Failed');
  }
};

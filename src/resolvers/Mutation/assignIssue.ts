import _ from "lodash";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";
import { ActivityAction, EntityType, MemberRole, User, UserTeam } from "@prisma/client";
import { client, TransactionClient } from "../../config/db";
import { notFoundError } from "../../libraries/errors/notFoundError";
import { conflictError } from "../../libraries/errors/conflictError";
import {
  ISSUE_NOT_FOUND,
  ALREADY_ASSIGNED_ISSUE,
  ASSIGNEE_NOT_MEMBER,
  PROJECT_NOT_FOUND,
  ASSIGNEE_NOT_FOUND,
} from "../../globals";
import { UnauthorizedError } from "../../libraries/errors/unAuthorizedError";
import { buildActivityData, CreateActivityInput } from "../../services/Activity/Create";


//this resolver is to assign the issue to a user
export const assineIssue: MutationResolvers["assineIssue"] = async (
  _,
  args,
  context
) => {
  const assignee: User = (await context.client.user.findUnique({
    where: { id: args.input.assigneeId },
    select: {
      id: true,
    },
  })) as User;

  //if assigneee not exist throw a error
  if (!assignee) {
    throw new notFoundError(
      ASSIGNEE_NOT_FOUND.MESSAGE,
      ASSIGNEE_NOT_FOUND.CODE
    );
  }

  //fetch project by id which is required to 
  const project = await context.client.project.findUnique({
    where: { id: args.input.projectId },
    include: {
      issues: {
        where: {
          id: args.input.issueId,
        },
        select: {
          id: true,
          assigneeId: true,
          projectId: true,
          type: true,
          key: true,
        },
      },
      teams: {
        select: {
          team: {
            select: {
              id: true,
              users: {
                where: {
                  userId: assignee.id,
                },
                select: {
                  id: true,
                  userId: true,
                  role: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!project) {
    throw new notFoundError(PROJECT_NOT_FOUND.MESSAGE, PROJECT_NOT_FOUND.CODE);
  }
  if (project.issues.length === 0) {
    throw new notFoundError(ISSUE_NOT_FOUND.MESSAGE, ISSUE_NOT_FOUND.CODE);
  }

  const issue = project.issues[0];

  if (!issue) {
    throw new notFoundError(ISSUE_NOT_FOUND.MESSAGE, ISSUE_NOT_FOUND.CODE);
  }

  // //issue type EPIC and STORY can not be assigned
  // if (issue.type === IssueType.EPIC || issue.type === IssueType.STORY) {
  //   throw new conflictError(
  //     INVALID_ISSUE_TYPE.MESSAGE,
  //     INVALID_ISSUE_TYPE.CODE
  //   );
  // }

  //in case issue is already assigned to same user
  if (issue.assigneeId === args.input.assigneeId) {
    throw new conflictError(
      ALREADY_ASSIGNED_ISSUE.MESSAGE,
      ALREADY_ASSIGNED_ISSUE.CODE
    );
  }

  //check issue belongs to requested project
  if (issue.projectId !== args.input.projectId) {
    throw new conflictError(ISSUE_NOT_FOUND.MESSAGE, ISSUE_NOT_FOUND.CODE);
  }

  let role = null;

  //check assigner is authorized to perform this action
  const isMember = project.teams.some((team: any) =>
    team.team.users.some((user: UserTeam) => {
      if (user.userId === assignee.id) {
        role = user.role;
        return true;
      }
      else {
        return false;
      }
    })
  );
  if (!isMember) {
    throw new conflictError(
      ASSIGNEE_NOT_MEMBER.MESSAGE,
      ASSIGNEE_NOT_MEMBER.CODE
    );
  }

  if (role === MemberRole.Viewer) {
    throw new UnauthorizedError("you are not authorized to perform this action");
  }

  //since user is not direclty in relation with issues we have to update each manually
  try {
    await context.client.$transaction(async (prisma: TransactionClient) => {
      await prisma.issue.update({
        where: {
          id: issue.id,
        },
        data: {
          assignee: {
            connect: {
              id: assignee.id,
            },
          },
        },
      });

      await prisma.user.update({
        where: {
          id: assignee.id,
        },
        data: {
          assignedIssues: {
            connect: {
              id: issue.id,
            },
          },
        },
      });
    });
  } catch (e) {
    console.log(e);
    throw new Error("update issue and user failed");
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

  //create issues assigned message
  return {
    message: "Issue assigned successfully",
    success: true,
  };
};

import _ from "lodash";
import { AddIssueInput, MutationResolvers } from "../../types/generatedGraphQLTypes";
import { IssueType } from "@prisma/client";
import { ALREADY_PART_OF_SPRINT, ISSUE_NOT_FOUND, SPRINT_FAILED_TO_UPDATE, SPRINT_NOT_FOUND } from "../../globals";
import { conflictError } from "../../libraries/errors/conflictError";
import { notFoundError } from "../../libraries/errors/notFoundError";


export const addIssueInSprint: MutationResolvers["addIssueInSprint"] = async (_, args, context) => {
    const input: AddIssueInput = args.input as AddIssueInput;

    const sprint = await context.client.sprint.findFirst({
        where: {
            id: input.sprintId
        }
    });

    if (!sprint) {
        throw new notFoundError(SPRINT_NOT_FOUND.MESSAGE, SPRINT_NOT_FOUND.CODE)
    }

    const issue = await context.client.issue.findFirst({
        where: {
            id: input.id
        },
        select: {
            id: true,
            type: true,
            status: true
        }
    });

    if (!issue) {
        throw new notFoundError(ISSUE_NOT_FOUND.MESSAGE, SPRINT_NOT_FOUND.CODE)
    }

    const issueAlreadyInSprint = await context.client.issue.findFirst({
        where: {
            AND: [
                {
                    id: input.id,
                },
                {
                    sprintId: input.sprintId
                }
            ]
        }
    });

    if (issueAlreadyInSprint) {
        throw new conflictError(ALREADY_PART_OF_SPRINT.MESSAGE, ALREADY_PART_OF_SPRINT.CODE)
    }


    if (issue.type === IssueType.EPIC || issue.type === IssueType.STORY) {
        throw new Error('Epic and Story cannot be added in sprint');
    }


    try {
        await context.client.issue.update({
            where: {
                id: input.id
            },
            data: {
                sprint: {
                    connect: {
                        id: input.sprintId
                    }
                }
            }
        });
    } catch (e) {
        throw new conflictError(SPRINT_FAILED_TO_UPDATE.MESSAGE, SPRINT_FAILED_TO_UPDATE.CODE)
    }

    return {
        message: "Issue added Successfully",
        success: true
    }
}
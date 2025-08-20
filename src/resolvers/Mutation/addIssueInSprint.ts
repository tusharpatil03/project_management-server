import _ from "lodash";
import { AddIssueInput, MutationResolvers } from "../../types/generatedGraphQLTypes";
import { ActivityAction, EntityType, IssueType } from "@prisma/client";
import { ALREADY_PART_OF_SPRINT, ISSUE_NOT_FOUND, SPRINT_FAILED_TO_UPDATE, SPRINT_NOT_FOUND } from "../../globals";
import { conflictError } from "../../libraries/errors/conflictError";
import { notFoundError } from "../../libraries/errors/notFoundError";
import { CreateActivity, CreateActivityInput } from "../../services/Activity/Create";

//this resolver adds the existing issues in sprint
// inputs: projectId, sprintId, issueId

export const addIssueInSprint: MutationResolvers["addIssueInSprint"] = async (_, args, context) => {
    const input: AddIssueInput = args.input as AddIssueInput;  //type safety

    //fetch sprint first to check sprint exist or not
    const sprint = await context.client.sprint.findFirst({
        where: {
            id: input.sprintId
        }
    });

    //check sprint exist or not
    if (!sprint) {
        throw new notFoundError(SPRINT_NOT_FOUND.MESSAGE, SPRINT_NOT_FOUND.CODE)
    }

    //fetch issue
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

    //if issue did not exist throw error
    if (!issue) {
        throw new notFoundError(ISSUE_NOT_FOUND.MESSAGE, SPRINT_NOT_FOUND.CODE)
    }

    // check issue already present in sprint
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

    // //issue type EPIC and STORY can't add into sprint
    // if (issue.type === IssueType.EPIC || issue.type === IssueType.STORY) {
    //     throw new Error('Epic and Story cannot be added in sprint');
    // }

    //update issue with sprintid
    //no need to update sprint here, prisma will manage it internally
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

    //create activity: issues added in sprint
    const createActivityInput: CreateActivityInput = {
        action: ActivityAction.ISSUE_ADDED_TO_SPRINT,
        entityType: EntityType.SPRINT,
        entityId: sprint.id,
        entityName: sprint.key,
        description: "Issues Added in sprint",
        userId: context.userId,
        projectId: sprint.projectId,
        sprintId: sprint.id,
        issueId: issue.id,
    }
    try{
        await CreateActivity(createActivityInput, context.client);
    }catch(e){
        console.log("Failed to create activity", e);
    }

    //return message
    return {
        message: "Issue added Successfully",
        success: true
    }
}
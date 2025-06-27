import _ from "lodash";
import { AddIssueInput, MutationResolvers } from "../../types/generatedGraphQLTypes";
import { IssueType } from "@prisma/client";


export const addIssueInSprint: MutationResolvers["addIssueInSprint"] = async (_, args, context) => {

    const input: AddIssueInput = args.input as AddIssueInput;

    try {
        await context.client.sprint.findFirstOrThrow({
            where: {
                id: input.sprintId
            }
        });

        await context.client.issue.findFirstOrThrow({
            where: {
                id: input.id
            }
        })
    }
    catch (e) {
        throw new Error("Sprint or Issue not exist");
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
        throw new Error("Issue not found");
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
        throw new Error("unable to add Issue in sprint");

    }


    return {
        message: "Issue added Successfully",
        success: true
    }

}
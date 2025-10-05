import { IssuePriority, IssueStatus, IssueType } from "@prisma/client";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";


export const updateIssue:MutationResolvers["updateIssue"] = async (_, args, context)=> {
    const issue = await context.client.issue.findFirst({
        where: {
            AND: [
                { id: args.input.issueId },
                {projectId: args.input.projectId}
            ]
        }
    })

    if(!issue){
        return {
            message: "Issue Not Found",
            success: false
        }
    }
    try{
        await context.client.issue.update({
            where: {
                id: args.input.issueId,
            },
            data: {
                title: args.input.title || issue?.title,
                description: args.input.description || issue.description,
                status: args.input.status as IssueStatus || issue.status,
                priority: args.input.priority as IssuePriority || issue.priority,
                type: args.input.type as IssueType || issue.type,
                dueDate: args.input.dueDate || issue.dueDate,
                assigneeId: args.input.assigneeId || issue.assigneeId,
            }
        })
    }
    catch(e){
        console.log("error:", e);
        return {
            message: "Something went wrong",
            success: false,
        }
    }

    return {
        message: "Issue Updated",
        success: false,
    }
}
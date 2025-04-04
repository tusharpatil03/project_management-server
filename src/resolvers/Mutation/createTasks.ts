import { MutationResolvers } from "../../types/generatedGraphQLTypes";

export const createTask:MutationResolvers["createTask"] = async (_, args, context)=> {
    const {input} = args;
    const sprint = context.prisma.sprint.create({
        data: {
            title: input.title,
            description: input.description,
            dueDate: input.dueDate,
            creatorId: input.creatorId,
            projectId: input.projectId,
            sprintId: input.sprintId
        }
    }) ;

    return sprint;
}  
import { MutationResolvers } from "../../types/generatedGraphQLTypes";

export const createSprint:MutationResolvers["createSprint"] = async (_, args, context)=> {
    const {input} = args;
    const sprint = context.prisma.sprint.create({
        data: {
            title: input.title,
            description: input.description,
            dueDate: input.dueDate,
            creatorId: input.creatorId,
            tasks: input.tasks,
            projectId: input.projectId
        }
    }) ;

    return sprint;
}  
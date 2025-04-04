import { MutationResolvers } from "../../types/generatedGraphQLTypes";

export const createProject:MutationResolvers["createProject"] = async (_, args, context)=> {
    const {input} = args;
    const project = context.prisma.project.create({
        data: {
            name: input.name,
            description: input.description,
            creatorId: context.user.id,
            goal: input.goal,
            plan: input.plan,
        },
        include: {
            teams: true,
            tasks: true,
            sprints: true
        }
    }) ;

    return project;
}  
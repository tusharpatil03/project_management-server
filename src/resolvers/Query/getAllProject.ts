import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import _ from "lodash";

export const getAllProjects:QueryResolvers["getAllProjects"] = async (_, args, context)=> {
    return context.prisma.Project.findUnique({where: {
        id: args
    }})
}
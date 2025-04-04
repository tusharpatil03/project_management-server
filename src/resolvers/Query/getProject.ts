import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import _ from "lodash";

export const getProjectById:QueryResolvers["getProjectById"] = async (_, args, context)=> {
    return context.prisma.Project.findUnique({where: {
        id: args.id,
    }})
}
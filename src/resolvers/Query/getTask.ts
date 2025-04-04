import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import _ from "lodash";

export const getTaskById:QueryResolvers["getTaskById"] = async (_, args, context)=> {
    return context.prisma.task.findUnique({where: {
        id: args.id,
    }})
}
import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import _ from "lodash";

export const getSprintById:QueryResolvers["getSprintById"] = async (_, args, context)=> {
    return context.prisma.sprint.findUnique({where: {
        id: args.id,
    }})
}

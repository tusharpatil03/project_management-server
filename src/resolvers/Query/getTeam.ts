import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import _ from "lodash";

export const getTeamById:QueryResolvers["getTeamById"] = async (_, args, context)=> {
    return context.prisma.team.findUnique({where: {
        id: args.id,
    }})
}
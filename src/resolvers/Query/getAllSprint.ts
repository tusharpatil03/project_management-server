import _ from "lodash";
import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getAllSprints: QueryResolvers["getAllSprints"] = async (_, args, context) => {
  return context.prisma.sprint.findMany({
    where: {
      projectId: args.projectId,
    },
    include:{
        tasks: true,
    }
  });
};

import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getAllTasks: QueryResolvers["getAllTasks"] = async (_, args, context) => {
  return context.prisma.task.findMany({
    where: {
      projectId: args.projectId,
    }
  });
};

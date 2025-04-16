import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getAllTasks: QueryResolvers["getAllTasks"] = async (
  _,
  args,
  context,
) => {
  const userId = context.authData.userId;

  const project = await context.client.project.findUnique({
    where: { id: args.projectId },
    include: {
      tasks: true,
    },
  });

  if (!project) {
    throw new Error("project not found");
  }

  return project.tasks;
};

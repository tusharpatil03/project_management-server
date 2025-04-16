import { MutationResolvers } from "../../types/generatedGraphQLTypes";

export const createTask: MutationResolvers["createTask"] = async (_, args, context) => {
  const { input } = args;
  try {
    const sprint = context.prisma.sprint.create({
      data: {
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        creatorId: input.creatorId,
        projectId: input.projectId,
        sprintId: input.sprintId,
      },
    });

    return sprint;
  } catch (e) {
    console.log("Error in creating Task: ", e);
    throw new Error("Unable to Creat Task");
  }
};

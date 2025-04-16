import { MutationResolvers } from "../../types/generatedGraphQLTypes";

export const createTask: MutationResolvers["createTask"] = async (
  _,
  args,
  context,
) => {
  const { input } = args;

  try {
    const task = context.prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        creator: {
          connect: {
            id: context.authData.userId,
          },
        },
        projectId: input.projectId,
      },
    });

    return task;
  } catch (e) {
    console.log("Error in creating Task: ", e);
    throw new Error("Unable to Creat Task");
  }
};

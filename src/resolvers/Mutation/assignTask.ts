import _, { assign } from "lodash";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";

export const assineTask: MutationResolvers["assineTask"] = async (
  parents,
  args,
  context,
) => {
  try {
    const task = context.client.task.updated({
      where: {
        id: args.input.id,
      },
      data: {
        assign: args.input.assignee,
      },
    });
  } catch (e) {
    console.log("Task Assing Error: ", e);
    throw new Error("Failed to assign Task");
  }

  return {
    message: "",
    success: true,
  };
};

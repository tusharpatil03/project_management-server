import _ from "lodash";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";

export const updateTaskStatus: MutationResolvers["updateTaskStatus"] = async (
  parents,
  args,
  context
) => {
  try{
    const task = context.client.task.updated({
      where: {
        id: args.taskId,
      },
      data: {
        status: args.status,
      },
    });
  
  }
  catch(e){
    console.log("Task Update Error: ",e)
    throw new Error("Unable to Update Task")
  }

  return {
    message: "Task Updated",
    success: true,
  };
};

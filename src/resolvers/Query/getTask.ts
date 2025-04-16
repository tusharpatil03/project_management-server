import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import _ from "lodash";

export const getTaskById: QueryResolvers["getTaskById"] = async (
  _,
  args,
  context,
) => {
  const task = await context.client.task.findUnique({
    where: { id: args.id, projectId: args.id },
  });

  if (!task) {
    throw new Error("task not found");
  }

  return task;
};

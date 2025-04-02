import _ from "lodash";
import {
  AssignTaskInput,
  ResponseMessage,
} from "../../types/generatedGraphQLTypes";

export const assignTask = async (
  parents: any,
  args: AssignTaskInput,
): Promise<ResponseMessage> => {
  return {
    message: "",
    success: true,
  };
};

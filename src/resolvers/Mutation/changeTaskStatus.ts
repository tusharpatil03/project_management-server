import _ from "lodash";
import {
  MutationResolvers
} from "../../types/generatedGraphQLTypes";

export const updateTaskStatus:MutationResolvers["updateTaskStatus"] = async (
  parents,
  args
)=> {
  
  return {
    message: "",
    success: true,
  };
};

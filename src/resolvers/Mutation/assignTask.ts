import _ from "lodash";
import {
  MutationResolvers
} from "../../types/generatedGraphQLTypes";

export const assineTask:MutationResolvers["assineTask"] = async (
  parents,
  args
)=> {
  
  return {
    message: "",
    success: true,
  };
};

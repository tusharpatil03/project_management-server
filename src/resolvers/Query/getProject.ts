import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import _ from "lodash";

export const getProjectById:QueryResolvers["getProjectById"] = async (_, args, context)=> {
    const project = await context.client.project.findUnique({
        where: { id: args.id },
      });
    
      if (!project) {
        throw new Error("project not found");
      }
    
      return project;
}
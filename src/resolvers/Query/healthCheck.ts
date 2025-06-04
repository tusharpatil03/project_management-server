import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const healthCheck:QueryResolvers["healthCheck"] = ()=> {
    return {
        success: true,
        status: 200
    }
}
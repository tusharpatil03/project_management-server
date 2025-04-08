
import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getUserByEmail:QueryResolvers["getUserByEmail"] = async (_, args, context) => {
    const user = await context.user.findUnique({where: {
        email: args.email
    }})
    if (user == null){
        return {message: "failed to fetch user", success: false}
    }
    return user;
}
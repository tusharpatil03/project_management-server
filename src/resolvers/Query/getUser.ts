import { User } from "@prisma/client";
import { client } from "../../db";
import { QueryResolvers, ResponseMessage } from "../../types/generatedGraphQLTypes";

export const getUserById:QueryResolvers["getUserById"] = async (_, args, context) => {
    const user = await context.user.findUnique({where: {
        id: args.id
    }})
    if (user == null){
        return {message: "failed to fetch user", success: false}
    }
    return user;
}
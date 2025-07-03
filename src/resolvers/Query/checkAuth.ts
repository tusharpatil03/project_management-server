import { USER_NOT_FOUND_ERROR } from "../../globals";
import { notFoundError } from "../../libraries/errors/notFoundError";
import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const checkAuth: QueryResolvers["checkAuth"] = async(_, args, context) => {
    const user = await context.client.user.findUnique({
        where: {
            id: context.userId
        },
        include: {
            profile: true
        }
    });

    if (!user || !user.profile) {
        throw new notFoundError(USER_NOT_FOUND_ERROR.MESSAGE, USER_NOT_FOUND_ERROR.CODE);
    }

    return user;
}
import { QueryResolvers } from '../../types/generatedGraphQLTypes';

export const getUserByEmail: QueryResolvers['getUserByEmail'] = async (
    _,
    args,
    context
) => {
    const user = await context.client.user.findFirst({
        where: {
            email: args.email
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            profile: {
                select: {
                    id: true,
                    avatar: true,
                }
            }
        }
    });

    if (!user) {
        throw new Error("Unable to Find User")
    }
    return user;
};

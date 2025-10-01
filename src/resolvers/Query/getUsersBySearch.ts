import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getUsersBySearch: QueryResolvers["getUsersBySearch"] = async (_, { search }, context) => {
    const users = await context.client.user.findMany({
        where: {
            OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ]
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profile: {
                select: {
                    id: true,
                    avatar: true,
                }
            }
        },
        take: 10
    });

    return users;
}
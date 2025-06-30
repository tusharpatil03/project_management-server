import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getAllUserTeams: QueryResolvers["getAllUserTeams"] = async (_, args, context) => {

    const teams = await context.client.team.findMany({
        where: {
            OR: [
                { creatorId: context.userId },
                {
                    users: {
                        some: {
                            userId: context.userId,
                        },
                    },
                },
            ],
        },
        include: {
            users: {
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            username: true,
                        },
                    },
                },
            }
        },
    });

    const teamsWithMembers = teams.map((team) => {
        return {
            ...team,
            members: team.users.map((user) => ({
                id: user.user.id,
                username: user.user.username,
                email: user.user.email,
                // Only include role if your User type in GraphQL schema has it, and ensure the type matches
                ...(user.role ? { role: user.role as any } : {})
            }))
        };
    });

    return teamsWithMembers;
} 
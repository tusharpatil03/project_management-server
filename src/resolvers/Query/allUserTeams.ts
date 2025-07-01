import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getAllUserTeams: QueryResolvers["getAllUserTeams"] = async (_, args, context) => {

    // const teams = await context.client.team.findMany({
    //     where: {
    //         OR: [
    //             { creatorId: context.userId },
    //             {
    //                 users: {
    //                     some: {
    //                         userId: context.userId,
    //                     },
    //                 },
    //             },
    //         ],
    //     },
    //     include: {
    //         users: {
    //             include: {
    //                 user: {
    //                     select: {
    //                         id: true,
    //                         email: true,
    //                         username: true,
    //                     },
    //                 },
    //             },
    //         }
    //     },
    // });

    const userTeams = await context.client.userTeam.findMany({
        where: {
            userId: context.userId,
        },
        include: {
            team: {
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    creatorId: true
                }
            }
        }
    })

    return userTeams;
} 
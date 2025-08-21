import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getAllTeams: QueryResolvers["getAllTeams"] = async (_, args, context) => {
    const teams = await context.client.team.findMany({
        where: {
            users: {
                some: {
                    userId: context.userId,
                }
            }
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            creatorId: true,
            users: {
                select: {
                    id: true,
                    role: true,
                    user: {
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
                        }
                    }
                }
            }
        }
    });

    // return teams.map(team => ({
    //     id: team.id,
    //     name: team.name,
    //     createdAt: team.createdAt,
    //     updatedAt: team.updatedAt,
    //     creatorId: team.creatorId,
    //     users: team.users.map(userTeam => ({
    //         id: userTeam.id,
    //         role: userTeam.role,
    //         user: {
    //             id: userTeam.user.id,
    //             firstName: userTeam.user.firstName,
    //             lastName: userTeam.user.lastName,
    //             email: userTeam.user.email,
    //             profile: {
    //                 avatar: userTeam.user.profile.avatar
    //             }
    //         }
    //     }))
    // }));

    return teams;
}
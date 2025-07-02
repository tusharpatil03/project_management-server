import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getProjectTeamsMembers: QueryResolvers["getProjectTeamsMembers"] = async (_, args, context) => {

    if (!context.userRole) {
        throw new Error("unauthorized access")
    }

    const teams = await context.client.team.findMany({
        where: {
            projects: {
                some: {
                    projectId: args.projectId
                }
            }
        },
        include: {
            users: {
                select: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            username: true,
                        }
                    },
                    id: true,
                    role: true,
                    joinedAt: true,
                }
            }
        }
    });

    if (teams.length <= 0) {
        throw new Error("Teams not found")
    }

    return teams;


}
import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getProjectTeamsMembers: QueryResolvers["getProjectTeamsMembers"] = async (_, args, context) => {
    const users = await context.client.user.findMany({
        where: {
            teams: {
                some: {
                    team: {
                        projects: {
                            some: {
                                projectId: args.projectId
                            }
                        }
                    }
                }
            }
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            profile: {
                select: {
                    id: true,
                    avatar: true
                }
            }
        }
    });


    return users;
}
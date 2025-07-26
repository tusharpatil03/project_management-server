import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getProjectTeamsMembers: QueryResolvers["getProjectTeamsMembers"] = async (_, args, context) => {
    console.log("MEMBERS HIT BY CLIENT");
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
                            firstName: true,
                            lastName: true,
                            profile: {
                                select: {
                                    id: true,
                                    avatar: true
                                }
                            }
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

    const members = teams
        .flatMap(team => team.users)
        .map(member => {
            const user = member.user;
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                profile: user.profile
            };
        });

    return members;
}
import { ProjectStatus } from "@prisma/client";
import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getUserInfo: QueryResolvers['getUserInfo'] = async (_, __, context) => {
    if (!context.userId) {
        return null;
    }

    const projects = await context.client.project.findMany({
        where: {
            teams: {
                some: {
                    team: {
                        users: {
                            some: {
                                userId: context.userId
                            }
                        }
                    }
                }
            },
            status: ProjectStatus.ACTIVE
        },
        include: {
            creator: {
                include: {
                    profile: true,
                },
            },
        },
        orderBy: {
            updatedAt: 'desc',
        },
        take: 4 // limit to 4 projects
    });

    const user = await context.client.user.findUnique({
        where: {
            id: context.userId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profile: {
                select: {
                    id: true,
                    avatar: true
                }
            }
        }
    });

    if (!user) {
        return null;
    }

    return {
        ...user,
        projects: projects,
    }

}
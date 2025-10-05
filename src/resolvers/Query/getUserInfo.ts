import { ProjectStatus } from "@prisma/client";
import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getUserInfo: QueryResolvers['getUserInfo'] = async (_, __, context) => {
    if (!context.userId) {
        throw new Error("Unauthorized");
    }

    const user = await context.client.user.findUnique({
        where: {
            id: context.userId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            updatedAt: true,
            email: true,
            profile: {
                select: {
                    id: true,
                    avatar: true,
                    social: true,
                }
            },
            projects: {
                where: {
                    status: ProjectStatus.ACTIVE,
                },
                select: {
                    id: true,
                    name: true,
                    key: true,
                    description: true,
                    createdAt: true,
                    updatedAt: true,
                    status: true,
                },
            },
            activities: {
                select: {
                    id: true,
                    action: true,
                    createdAt: true,
                    entityType: true,
                    projectId: true,
                    issueId: true,
                    userId: true,
                    project: { select: { id: true, name: true, key: true } },
                }
            }
        }
    });

    if(!user){
        throw new Error("User not found");
    }

    return user;

}
import { Prisma, SprintStatus } from "@prisma/client";
import { client } from "../../db/db";
import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import { GraphQLError } from "graphql";


export const getRecentProject: QueryResolvers["getRecentProject"] = async (_, args, context) => {
    try {
        const recentActivity = await client.activity.findFirst({
            where: {
                userId: context.userId,
            },
            select: {
                id: true,
                projectId: true,
            }
        });

        if (!recentActivity || !recentActivity.projectId) {
            const project = await client.project.findFirst({
                where: {
                    creatorId: context.userId
                },
                orderBy: {
                    updatedAt: 'desc'
                },
                select: {
                    id: true,
                    key: true,
                    name: true,
                    description: true,
                    sprints: {
                        where: {
                            status: SprintStatus.ACTIVE,
                        },
                        select: {
                            id: true,
                            key: true,
                            title: true,
                            projectId: true,
                            dueDate: true,
                            status: true,
                        }
                    },
                    createdAt: true,
                    updatedAt: true,
                    status: true,
                    creatorId: true,
                }
            });

            // console.log(project)

            return project;
        }



        const project = await client.project.findFirst({
            where: {
                id: recentActivity?.projectId
            },
            orderBy: {
                updatedAt: 'desc'
            },
            select: {
                id: true,
                key: true,
                name: true,
                description: true,
                sprints: {
                    where: {
                        status: SprintStatus.ACTIVE,
                    },
                    select: {
                        id: true,
                        key: true,
                        title: true,
                        projectId: true,
                        dueDate: true,
                        status: true,
                    }
                },
                createdAt: true,
                updatedAt: true,
                status: true,
                creatorId: true,
            }
        });



        if (!project) {
            throw new GraphQLError("No project found for this user.", {
                extensions: { code: "NOT_FOUND" }
            });
        }

        if (project.creatorId !== context.userId) {
            throw new Error("you are not authorized")
        }


        // console.log(project)

        return project;


    } catch (e) {
        console.log(e);
        return null;
    }
}
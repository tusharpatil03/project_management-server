import { client } from "../../db";
import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import { GraphQLError } from "graphql";


export const getRecentProject: QueryResolvers["getRecentProject"] = async (_, args, context) => {
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
            createdAt: true,
            updatedAt: true,
            status: true,
            issues: {
                select: {
                    id: true,
                    title: true,
                    dueDate: true,
                    type: true,
                    parent: {
                        select: {
                            id: true,
                            title: true,
                            dueDate: true,
                            type: true
                        }
                    }

                }
            },
            sprints: {
                select: {
                    id: true,
                    title: true,
                    dueDate: true,
                    status: true,
                    issues: {
                        select: {
                            id: true,
                            title: true,
                            dueDate: true,
                        }
                    }
                }
            },
            creatorId: true,
        }
    });


    if (!project) {
        throw new GraphQLError("No recent project found for this user.", {
            extensions: { code: "NOT_FOUND" }
        });
    }

    if(project.creatorId !== context.userId){
        throw new Error("you are not authorized")
    }

    return project;

}
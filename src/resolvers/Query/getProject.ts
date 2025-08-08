import { QueryResolvers } from "../../types/generatedGraphQLTypes";

export const getProject: QueryResolvers["getProject"] = async (_, args, context) => {
    if (!args.projectKey && !args.projectId) {
        return null;
    }

    try {
        const project = await context.client.project.findFirst({
            where: {
                OR: [
                    {
                        id: args.projectId || undefined,
                    },
                    {
                        key: args.projectKey || undefined
                    }
                ]
            }
        });


        return project;
    } catch (e) {
        console.log(e);
        return null;
    }
}
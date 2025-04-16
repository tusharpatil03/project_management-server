import { MutationResolvers } from "../../types/generatedGraphQLTypes";

export const createProject: MutationResolvers["createProject"] = async (
  _,
  args,
  context,
) => {
  const { input } = args;
  try {
    const project = await context.client.project.create({
      data: {
        name: input.name,
        description: input.description,
        goal: input.goal,
        plan: input.plan,
        creator: {
          connect: {
            id: context.authData.userId,
          },
        },
      },
    });

    return project;
  } catch (e) {
    console.log("Error in creating Project: ", e);
    throw new Error("Unable to Create Project");
  }
};

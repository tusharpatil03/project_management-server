import { MutationResolvers, User, UserRegisterInput } from "../../types/generatedGraphQLTypes";
import { client } from "../../db";

export const registerUser: MutationResolvers["registerUser"] = async (
  _,
  args,
  context
) => {
  const { input } = args;

  const user = await context.client.user.create({
    data: {
      email: input.email,
      password: input.password,
      role: input.role,
      salt: "sdicjm",
    },
    include: {
      projects: true,
      teams: true,
      createdTeams: true,
      createdTasks: true,
      assignedTasks: true,
      sprints: true,
    },
  });

  if(!user){
    throw new Error("unable to create user");
  }

  console.log(user.id);

  return {
    message: "",
    success: true,
  };
};
import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import _ from "lodash";

// export const getAllProjects: QueryResolvers["getAllProjects"] = async (
//   _,
//   __,
//   context
// ) => {
//   const userId = context.authData.userId;

//   const user = await context.client.user.findUnique({
//     where: { id: userId },
//     include: {
//       projects: true,
//     },
//   });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   return user.projects;
// };


export const getAllProjects: QueryResolvers["getAllProjects"] = async (
  _,
  __,
  context
) => {
  const userId = context.authData.userId;

  const userExists = await context.client.user.findUnique({
    where: { id: userId },
    select: { id: true }, // Lightweight fetch
  });

  if (!userExists) {
    throw new Error("User not found");
  }

  const projects = await context.client.project.findMany({
    where: { creatorId: userId },
  });

  return projects;
};
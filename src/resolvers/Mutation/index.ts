import { registerUser } from "./registerUser";
import { assineTask } from "./assignTask";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";
import { createProject } from "./createProject";
import { createTeam } from "./createTeam";
import { createTask } from "./createTasks";
import { createSprint } from "./createSprint";
import { updateTaskStatus } from "./changeTaskStatus";

export const Mutation:MutationResolvers = {registerUser, assineTask, createProject, createTeam, createTask, createSprint, updateTaskStatus};

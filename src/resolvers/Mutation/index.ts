import { signup } from "./signup";
import { assineTask } from "./assignTask";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";
import { createProject } from "./createProject";
import { createTeam } from "./createTeam";
import { createTask } from "./createTasks";
import { createSprint } from "./createSprint";
import { updateTaskStatus } from "./changeTaskStatus";
import { signin } from "./signin";

export const Mutation:MutationResolvers = {signup, signin, assineTask, createProject, createTeam, createTask, createSprint, updateTaskStatus};

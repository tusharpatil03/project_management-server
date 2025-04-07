import { getAllProjects } from "./getAllProject";
import { getAllSprints } from "./getAllSprint";
import { getAllTasks } from "./getAllTasks";
import { getProjectById } from "./getProject";
import { getSprintById } from "./getSprint";
import { getTaskById } from "./getTask";
import { getTeamById } from "./getTeam";
import { getUserByEmail } from "./getUser";

export const Query = {getUserByEmail, getTaskById, getSprintById, getProjectById, getAllSprints, getAllTasks, getTeamById, getAllProjects}
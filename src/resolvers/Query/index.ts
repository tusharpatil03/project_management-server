import { getAllProjects } from './getAllProject';
import { getAllSprints } from './getAllSprint';
import { getAllTasks } from './getAllTasks';
import { getProjectById } from './getProjectById';
import { getSprintById } from './getSprintById';
import { getTaskById } from './getTask';
import { getTeamById } from './getTeam';
import { getUserById } from './getUser';
import { healthCheck } from './healthCheck';

export const Query = {
  healthCheck,
  getUserById,
  getTaskById,
  getSprintById,
  getProjectById,
  getAllSprints,
  getAllTasks,
  getTeamById,
  getAllProjects,
};

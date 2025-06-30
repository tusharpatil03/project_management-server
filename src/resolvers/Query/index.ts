import { getAllProjects } from './allProjects';
import { getAllSprints } from './allSprints';
import { getAllIssues } from './allissues';
import { getProjectById } from './getProjectById';
import { getSprintById } from './getSprintById';
import { getIssueById } from './getIssue';
import { getTeamById } from './getTeam';
import { getUserById } from './getUser';
import { healthCheck } from './healthCheck';
import { getRecentProject } from './getRecentProject';
import { getUserByEmail } from './getUserByEmail';
import { getAllUserTeams } from './allUserTeams';

export const Query = {
  healthCheck,
  getUserById,
  getIssueById,
  getSprintById,
  getProjectById,
  getAllSprints,
  getAllIssues,
  getTeamById,
  getAllProjects,
  getRecentProject,
  getAllUserTeams,
  getUserByEmail
};

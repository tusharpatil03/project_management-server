import { getAllProjects } from './allProjects';
import { getAllSprints } from './allSprints';
import { getAllIssues } from './allissues';
import { getProjectById } from './getProjectById';
import { getSprintById } from './getSprintById';
import { getIssueById } from './getIssue';
import { getTeamById } from './getTeam';
import { getUserById } from './getUser';
import { checkAuth } from './checkAuth';
import { getRecentProject } from './getRecentProject';
import { getUserByEmail } from './getUserByEmail';
import { getAllUserTeams } from './allUserTeams';
import { getProjectTeamsMembers } from './getProjectTeamsMembers';
import { getActiveSprint } from './getActiveSprint';

export const Query = {
  checkAuth,
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
  getUserByEmail,
  getProjectTeamsMembers,
  getActiveSprint
};

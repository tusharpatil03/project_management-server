import { getAllProjects } from './allProjects';
import { getAllSprints } from './allSprints';
import { getAllIssues } from './allissues';
import { getSprintById } from './getSprintById';
import { getIssueById } from './getIssue';
import { getTeamById } from './getTeam';
import { getUser } from './getUser';
import { checkAuth } from './checkAuth';
import { getRecentProject } from './getRecentProject';
import { getAllUserTeams } from './allUserTeams';
import { getProjectTeamsMembers } from './getProjectTeamsMembers';
import { getActiveSprint } from './getActiveSprint';
import { getProject } from './getProject';

export const Query = {
  checkAuth,
  getUser,
  getIssueById,
  getSprintById,
  getAllSprints,
  getAllIssues,
  getTeamById,
  getAllProjects,
  getRecentProject,
  getAllUserTeams,
  getProjectTeamsMembers,
  getActiveSprint,
  getProject
};

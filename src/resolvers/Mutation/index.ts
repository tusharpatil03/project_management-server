import { signup } from './signup';
import { assineIssue } from './assignIssue';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { createProject } from './createProject';
import { createTeam } from './createTeam';
import { createIssue } from './createIssue';
import { createSprint } from './createSprint';
import { updateIssueStatus } from './updateIssueStatus';
import { login } from './login';

import { removeProject } from './removeProject';
import { removeIssue } from './removeIssue';
import { removeSprint } from './removeSprint';

import { removeAssineeOfIssue } from './removeAssigneeOfIssue';
import { addTeamMember } from './addTeamMember';
import { removeTeamMember } from './removeTeamMember';
import { refreshToken } from './refreshToken';
import { addIssueInSprint } from './addIssueInSprint';
import { removeTeam } from './removeTeam';
import { addProjectTeam } from './addProjectTeam';
import { sendVerificationLink } from './sendVerificationLink';
import { verifyUser } from './verifyUser'; 

export const Mutation: MutationResolvers = {
  signup,
  login,
  assineIssue,
  createProject,
  createTeam,
  createIssue,
  createSprint,
  updateIssueStatus,

  removeProject,
  removeSprint,
  removeIssue,
  removeTeam,

  removeAssineeOfIssue,
  addTeamMember,
  removeTeamMember,

  refreshToken,
  addIssueInSprint,
  addProjectTeam,
  sendVerificationLink,
  verifyUser
};

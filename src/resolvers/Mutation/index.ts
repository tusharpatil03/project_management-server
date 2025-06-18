import { signup } from './signup';
import { assineTask } from './assignTask';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { createProject } from './createProject';
import { createTeam } from './createTeam';
import { createTask } from './createTasks';
import { createSprint } from './createSprint';
import { updateTaskStatus } from './changeTaskStatus';
import { login } from './login';

import { removeProject } from './removeProject';
import { removeTask } from './removeTask';
import { removeSprint } from './removeSprint';

import { removeAssineeOfTask } from './removeAssigneeOfTask';
import { addTeamMember } from './addTeamMember';
import { removeTeamMember } from './removeTeamMember';
import { revokeAccessToken } from './revokeAccessToken';

export const Mutation: MutationResolvers = {
  signup,
  login,
  assineTask,
  createProject,
  createTeam,
  createTask,
  createSprint,
  updateTaskStatus,

  removeProject,
  removeSprint,
  removeTask,

  removeAssineeOfTask,
  addTeamMember,
  removeTeamMember,

  revokeAccessToken,
};

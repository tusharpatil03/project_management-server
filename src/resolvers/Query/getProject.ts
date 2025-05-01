import { client } from '../../db';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import _ from 'lodash';
import { InterfaceUser } from '../Mutation/login';
import { InterfaceTask } from '../Mutation/createTasks';
import { InterfaceTeam } from '../Mutation/createTeam';
import { InterfaceSprint } from '../Mutation/createSprint';

export interface InterfaceProject {
  id: string;
  name: string;
  description: string;
  goal: string;
  plan: string;
  creatorId: string;
  teamId: string;
  creator: InterfaceUser;
  tasks: InterfaceTask[];
  team: InterfaceTeam;
  sprints: InterfaceSprint[];
}

export const getProjectById: QueryResolvers['getProjectById'] = async (
  _,
  args,
  context
) => {
  if (!context.authData) {
    throw new Error('Unauthorized');
  }
  const user = await client.user.findUnique({
    where: {
      id: context.authData.userId
    },
    include: {
      projects: true,
    }
  });

  if (!user) {
    throw new Error('User not found');
  }
  const project = await client.project.findFirst({
    where: { creatorId: context.authData.userId },
  });

  if (!project) {
    throw new Error('project not found');
  }

  return project;
};

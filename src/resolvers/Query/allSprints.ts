import _ from 'lodash';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { PrismaClientType } from '../../db';
import { MemberRole } from '@prisma/client';

export interface InterfaceUserRole {
  role: MemberRole | undefined
}
export const isUserPartOfProject = async (
  userId: string,
  projectId: string,
  client: PrismaClientType
): Promise<InterfaceUserRole> => {


  const userTeam = await client.userTeam.findFirst({
    where: {
      AND: [
        { userId: userId },
        {
          team: {
            projects: {
              some: {
                projectId: projectId,
              },
            },
          },
        }
      ]
    },
    select: {
      role: true,
      team: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!userTeam || !userTeam.role) {
    return { role: undefined }
  }

  return { role: userTeam.role }

};


export const getAllSprints: QueryResolvers['getAllSprints'] = async (
  _,
  args,
  context
) => {
  const userId = context.userId;

  const project = await context.client.project.findUnique({
    where: {
      id: args.projectId
    },
    select: {
      id: true,
      creatorId: true,
    }
  });

  if (!project) {
    throw new Error("Project Not found")
  }

  const isPartOfProject: InterfaceUserRole = await isUserPartOfProject(userId, args.projectId, context.client);

  if (project.creatorId !== context.userId) {
    if (!isPartOfProject) {
      throw new Error("You Are Authorized person to view this project")
    }
  }


  const sprints = await context.client.sprint.findMany({
    where: {
      projectId: project.id
    },
    select: {
      id: true,
      status: true,
      title: true,
      dueDate: true,
      projectId: true,
      creatorId: true,
      issues: {
        select: {
          id: true,
          title: true,
          status: true,
          type: true,
          dueDate: true,
          assignee: {
            select: {
              firstName: true,
              lastName: true,
              profile: {
                select: {
                  id: true,
                  avatar: true,
                }
              },
              email: true,
              id: true
            }
          }
        }
      }
    }
  });

  if (!sprints || sprints.length === 0) {
    return null;
  }


  return sprints;
};
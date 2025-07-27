import { Team, UserTeam } from '@prisma/client';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { InterfaceUserRole, isUserPartOfProject } from './allSprints';

export const getSprintById: QueryResolvers['getSprintById'] = async (
  _,
  args,
  context
) => {
  const sprint = await context.client.sprint.findUnique({
    where: {
      id: args.id,
      projectId: args.projectId,
    },
    include: {
      issues: {
        include: {
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profile: {
                select: {
                  id: true,
                  avatar: true,
                }
              },
            },
          },
          assignee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profile: {
                select: { id: true, avatar: true }
              }
            }
          },
        },

      },
      project: {
        select: {
          key: true,
          id: true,
          creatorId: true,
        }
      }
    },
  });
  if (!sprint) {
    throw new Error('Sprint not found');
  }


  const isPartOfProject: InterfaceUserRole = await isUserPartOfProject(context.userId, sprint.project.id, context.client);

  if (sprint.project.creatorId !== context.userId) {
    if (!isPartOfProject) {
      throw new Error("You Are Authorized person to view this project")
    }
  }
  return sprint;
};

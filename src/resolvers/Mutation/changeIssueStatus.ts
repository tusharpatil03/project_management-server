import _ from 'lodash';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { IssueStatus, IssueType, UserTeam } from '@prisma/client';
export const updateIssueStatus: MutationResolvers['updateIssueStatus'] = async (
  _,
  args,
  context
) => {

  try {
    //check wether the user is part of project or not
    const project = await context.client.project.findUnique({
      where: {
        id: args.projectId,
      },
      select: {
        id: true,
        creatorId: true,
        teams: {
          select: {
            team: {
              select: {
                users: {
                  where: {
                    id: context.userId,
                  },

                },
              },
            },
          },
        },
      },
    });

    const isMember = project?.teams.some((team: any) => {
      team.team.users.some((user: UserTeam) => user.id === context.userId);
    });

    if (!isMember) {
      throw new Error('User is not part of this project');
    }

    if (args.status === IssueStatus.DONE) {
      const issue = await context.client.issue.findUnique({
        where: {
          id: args.issueId,
        },
        select: {
          id: true,
          type: true,
          childrens: {
            select: {
              id: true,
              status: true,
              childrens: {
                select: {
                  id: true,
                  status: true,
                }
              }
            }
          }
        }
      });

      const isValid = issue?.childrens.some((child) => {
        
      })

    }


    await context.client.$transaction(async (t) => {
      t.issue.update({
        where: {
          id: args.issueId,
        },
        data: {
          status: args.status,
        },
      });
    });
  } catch (e) {
    throw new Error('Unable to Update Issue');
  }

  return {
    message: 'Issue Updated',
    success: true,
  };
};

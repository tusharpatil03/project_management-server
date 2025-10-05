import { IssueStatus, SprintStatus, Team, UserTeam } from '@prisma/client';
import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { InterfaceUserRole, isUserPartOfProject } from './allSprints';

export const getActiveSprint: QueryResolvers['getActiveSprint'] = async (
    _,
    args,
    context
) => {
    const sprint = await context.client.sprint.findFirst({
        where: {
            projectId: args.projectId,
            status: SprintStatus.ACTIVE
        },
        select: {
            id: true,
            key: true,
            projectId: true,
            title: true,
            dueDate: true,
            status: true,
            issues: {
                select: {
                    id: true,
                    key: true,
                    title: true,
                    description: true,
                    status: true,
                    dueDate: true,
                    assignee: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                            profile: {
                                select: {
                                    id: true,
                                    avatar: true,
                                }
                            }
                        },
                    },
                },
            },
            creatorId: true,
            project: {
                select: {
                    id: true,
                    creatorId: true,
                    key: true,
                    name: true,
                },
            },
        },
    });
    if (!sprint) {
        throw new Error("Active Sprint not found");
    }


    const isPartOfProject: InterfaceUserRole = await isUserPartOfProject(context.userId, sprint.project.id, context.client);

    if (sprint.project.creatorId !== context.userId) {
        if (!isPartOfProject) {
            throw new Error("You Are Authorized person to view this project")
        }
    }
    return sprint;
};

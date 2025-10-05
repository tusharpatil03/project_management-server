import { ActivityAction, EntityType, Prisma } from "@prisma/client";
import { client,  TransactionClient } from "../../db/db"


export interface CreateActivityInput {
    action: ActivityAction;
    entityType: EntityType;
    entityId?: string | null;
    entityName?: string | null;
    description?: string | null;
    userId: string;
    projectId?: string | null;
    sprintId?: string | null;
    issueId?: string | null;
    teamId?: string | null;
}

export const buildActivityData = (input: CreateActivityInput): Prisma.ActivityCreateInput => {
    const { action, entityName, entityId, entityType, description } = input;
    let activityData: Prisma.ActivityCreateInput = {
        action,
        entityType,
        entityName,
        entityId,
        description,
        user: {
            connect: {
                id: input.userId,
            }
        }
    };

    if (input.projectId) {
        activityData = {
            ...activityData,
            project: {
                connect: {
                    id: input.projectId
                }
            }
        }
    }

    if (input.sprintId) {
        activityData = {
            ...activityData,
            sprint: {
                connect: {
                    id: input.sprintId
                }
            }
        }
    }

    if (input.issueId) {
        activityData = {
            ...activityData,
            issue: {
                connect: {
                    id: input.issueId
                }
            }
        }
    }

    if (input.teamId) {
        activityData = {
            ...activityData,
            team: {
                connect: {
                    id: input.teamId
                }
            }
        }
    }

    return activityData;

}

// export const CreateActivity = async (input: CreateActivityInput, prisma:TransactionClient) => {
//     await prisma.activity.create({
//         data: buildActivityData(input)
//     });
// }

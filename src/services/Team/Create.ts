import { ActivityAction, EntityType, MemberRole, Prisma } from "@prisma/client";
import { client, TransactionClient } from "../../db/db";
import { buildActivityData,  CreateActivityInput } from "../Activity/Create";

//this interface defines the input for create Issue
export interface TeamCreateInput {
    name: string;
    creatorId: string;
}

const buildTeamData = (input: TeamCreateInput): Prisma.TeamCreateInput => {
    let teamData = {
        ...input,
        creator: {
            connect: {
                id: input.creatorId,
            }
        }
    }

    return teamData;
}

export const CreateTeam = async (input: TeamCreateInput) => {
    try {
        client.$transaction(async (prisma: TransactionClient) => {
            const team = await prisma.team.create({
                data: buildTeamData(input),
            });

            await prisma.userTeam.create({
                data: {
                    team: {
                        connect: {
                            id: team.id
                        }
                    },
                    user: {
                        connect: {
                            id: input.creatorId
                        }
                    },
                    role: MemberRole.Admin
                }
            });

            // create activity
            const createActivityInput: CreateActivityInput = {
                action: ActivityAction.TEAM_CREATED,
                entityType: EntityType.TEAM,
                entityId: team.id,
                entityName: team.name,
                description: "New Team Created",
                userId: input.creatorId,
                teamId: team.id,
            }
            await prisma.activity.create({
                data: buildActivityData(createActivityInput)
            });
        })
    }
    catch (e) {
        console.log(e);
        throw new Error("Failed to create new Team");
    }
}
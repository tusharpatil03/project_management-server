import { ActivityAction, EntityType, ProjectTeam, Team } from "@prisma/client";
import { AddProjectTeamInput, MutationResolvers } from "../../types/generatedGraphQLTypes";
import { buildActivityData, CreateActivityInput } from "../../services/Activity/Create";
import { client } from "../../config/db";

//this resolver creates ProjectTeam which will connect the project with a team
//inputs: projectId, teamsId
export const addProjectTeam: MutationResolvers["addProjectTeam"] = async (_, args, context) => {
    const input: AddProjectTeamInput = args.input;

    // //check user is authorized
    // if (!context.userId) {
    //     throw new Error("you are not authorized")
    // }

    //fetch project from DB to chec projecct exist
    const project = await context.client.project.findFirst({
        where: {
            AND: [
                { id: input.projectId },
                { creatorId: context.userId }
            ]
        },
        select: {
            id: true,
            key: true,
            teams: {
                select: {
                    id: true,
                    teamId: true,
                },

            },
        }
    });

    if (!project) {
        throw new Error("Project not found")
    }


    //fetch team from DB to chec team exist
    const team = await context.client.team.findFirst({
        where: {
            id: input.teamId
        },
        select: {
            id: true,
            name: true,
        }
    });

    if (!team) {
        throw new Error("Team not exist")
    }

    //check is team already part of project
    let teamExist: boolean = false;

    project?.teams.map((t) => {
        if (t.teamId === input.teamId) {
            teamExist = true
        }
    });

    if (teamExist) {
        throw new Error(`Team with name ${team?.name}already Exist`)
    }

    //create projectTeam
    try {
        await context.client.projectTeam.create({
            data: {
                teamId: input.teamId,
                projectId: input.projectId
            }
        });
    } catch (e) {
        throw new Error("Unable to add team in project")
    }

    //create activity
    const createActivityInput: CreateActivityInput = {
        action: ActivityAction.PROJECT_TEAM_ADDED,
        entityType: EntityType.SPRINT,
        entityId: project.id,
        entityName: project.key,
        description: `PROJECT_TEAM_ADDED to project ${project.key}`,
        userId: context.userId,
        projectId: project.id,
        teamId: team.id,
    }
    try {
        await client.activity.create({
            data: buildActivityData(createActivityInput)
        });
    } catch (e) {
        console.log("Failed to create activity", e);
    }

    //return sucess message
    return {
        message: "new team added in project",
        success: true
    }

}
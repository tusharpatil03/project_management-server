import { AddProjectTeamInput, MutationResolvers } from "../../types/generatedGraphQLTypes";


export const addProjectTeam: MutationResolvers["addProjectTeam"] = async (_, args, context) => {
    const input: AddProjectTeamInput = args.input;

    if (!context.userId) {
        throw new Error("you are not authorized")
    }

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

    const project = await context.client.project.findFirst({
        where: {
            AND: [
                { id: input.projectId },
                { creatorId: context.userId }
            ]
        },
        select: {
            id: true,
            teams: {
                select: {
                    id: true,
                    teamId: true,
                },

            },
        }
    });

    let teamExist: boolean = false;

    project?.teams.map((t) => {
        if (t.teamId === input.teamId) {
            teamExist = true
        }
    });

    if (teamExist) {
        throw new Error(`Team with name ${team?.name}already Exist`)
    }


    try {
        await context.client.$transaction(async (prisma) => {
            await prisma.projectTeam.create({
                data: {
                    teamId: input.teamId,
                    projectId: input.projectId
                }
            });

            await prisma.project.update({
                where: {
                    id: input.projectId
                },
                data: {
                    teams: {
                        connect: {
                            id: input.teamId
                        }
                    }
                }
            });
        })
    } catch (e) {
        throw new Error("Unable to add team in project")
    }

    return {
        message: "new team added in project",
        success: true
    }

}
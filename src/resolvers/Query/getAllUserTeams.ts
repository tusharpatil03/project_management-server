import { MemberRole } from "@prisma/client";
import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import { getUserWithTeams } from "./getAllSprint";
import { InterfaceUserTeam } from "../Mutation/createTeam";

export const getAllUserTeams: QueryResolvers["getAllUserTeams"] = async (_, args, context) => {

    const userTeams = await context.client.userTeam.findMany({
        where: {
            userId: context.authData.userId
        },
        select: {
            id: true,
            team: {
                select: {
                    id: true,
                    name: true,
                    creatorId: true,
                    users: {
                        where: {
                            role: MemberRole.Admin
                        },
                        select: {
                            id: true,
                            role: true,
                            user: {
                                select: {
                                    username: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    const teams = userTeams.map((t:InterfaceUserTeam) => {
        return {
            id: t.team.id,
            name: t.team.name,
            admins: t.team.users.some((u) => u.role === MemberRole.Admin)
        }
    })


    return teams
} 
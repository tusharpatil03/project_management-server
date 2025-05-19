import { MemberRole } from "@prisma/client";
import { client } from "../../db";
import { QueryResolvers } from "../../types/generatedGraphQLTypes";
import { getUserWithTeams } from "./getAllSprint";

export const getAllUserTeams: QueryResolvers["getAllUserTeams"] = async (_, args, context) => {

    const userTeams = await client.userTeam.findMany({
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

    const teams = userTeams.map((t) => {
        return {
            id: t.team.id,
            name: t.team.name,
            admins: t.team.users.some((u) => u.role === MemberRole.Admin)
        }
    })


    return teams
} 
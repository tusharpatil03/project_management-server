import { EMAIL_VERIFICATION_SECRET } from "../../globals";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken, InterfaceCreateAccessToken, InterfaceCreateRefreshToken } from "../../utility/auth";
import { buildActivityData, CreateActivityInput } from "../../services/Activity/Create";
import { ActivityAction, EntityType, MemberRole } from "@prisma/client";

export const verifyUser: MutationResolvers["verifyUser"] = async (_, args, context) => {
    const token = args.token;
    if (!token) {
        console.log("Inavlid Token");
        throw new Error("Inavlid Token");
    }

    const decoded: { email: string } = jwt.verify(token as string, EMAIL_VERIFICATION_SECRET as string) as { email: string };

    if (!decoded.email) {
        throw new Error("Invalid token payload");
    }

    const user = await context.client.user.findUnique({
        where: {
            email: decoded.email,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isVerified: true,
            profile: {
                select: {
                    id: true,
                    tokenVersion: true
                }
            },
            projects: {
                select: {
                    id: true
                }
            },
            teams: {
                select: {
                    id: true
                }
            }
        },
    });

    if (!user || !user.profile) {
        throw new Error("User or user profile not found");
    }


    const accessTokenPayload: InterfaceCreateAccessToken = {
        userId: user.id,
        email: user.email,
    };

    const accessToken = createAccessToken(accessTokenPayload);

    const refreshTokenPayload: InterfaceCreateRefreshToken = {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        tokenVersion: user.profile.tokenVersion,
    }

    const refreshToken = createRefreshToken(refreshTokenPayload);

    if (!refreshToken || !accessToken) {
        const error = new Error('Failed to create token');
        error.name = 'RefreshTokenError';
        throw error;
    }

    try {
        await context.client.user.update({
            where: {
                email: decoded.email,
            },
            data: {
                isVerified: true,
            }
        });
    }
    catch(e){
        console.log(e);
        throw new Error("failed to update user");
    }

    if (user?.projects.length === 0) {
        await context.client.userProfile.update({
            where: { id: user.profile.id },
            data: {
                token: refreshToken,
                tokenVersion: {
                    increment: 1
                }
            },
        });

        await context.client.user.update({
            where: {
                id: user.id
            },
            data: {
                isVerified: true
            }
        });
        const project = await context.client.project.create({
            data: {
                name: 'Project01',
                key: "PRJ",
                description: "learn project management in 10 min",
                creator: {
                    connect: {
                        id: user.id,
                    }
                },
                starred: true,
            },
            select: {
                id: true
            }
        });

        const team = await context.client.team.create({
            data: {
                name: "my-team",
                creatorId: user.id
            }
        });

        await context.client.userTeam.create({
            data: {
                team: {
                    connect: {
                        id: team.id
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                },
                role: MemberRole.Admin
            }
        })

        await context.client.projectTeam.create({
            data: {
                project: {
                    connect: {
                        id: project.id
                    }
                },
                team: {
                    connect: {
                        id: team.id
                    }
                }
            }
        });


        let createActivityInput: CreateActivityInput = {
            action: ActivityAction.PROJECT_CREATED,
            entityType: EntityType.PROJECT,
            entityId: project.id,
            entityName: "Project",
            userId: context.userId,
            projectId: project.id,
            teamId: team.id
        }

        try {
            await context.client.activity.create({
                data: buildActivityData(createActivityInput)
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    return {
        accessToken,
        refreshToken,
    }

}

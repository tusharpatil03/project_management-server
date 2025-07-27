import { EMAIL_VERIFICATION_SECRET } from "../../globals";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken, InterfaceCreateAccessToken, InterfaceCreateRefreshToken } from "../../utility/auth";
import { connect } from "http2";

export const verifyUser: MutationResolvers["verifyUser"] = async (_, args, context) => {
    console.log("CORRECT HIT");
    const token = args.token;
    if (!token) {
        console.log("Inavlid Token");
        throw new Error("Inavlid Token");
    }

    const decoded: { email: string } = jwt.verify(token as string, EMAIL_VERIFICATION_SECRET as string) as { email: string }
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

    if (!refreshToken) {
        const error = new Error('Failed to create refresh token');
        error.name = 'RefreshTokenError';
        throw error;
    }


    // Update the user's profile with the new refresh token
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

    if (user.projects.length === 0) {
        const project = await context.client.project.create({
            data: {
                name: 'sample project',
                key: "SMP",
                description: "learn project management in 10 min",
                creator: {
                    connect: {
                        id: user.id,
                    }
                },
            },
            select: {
                id: true
            }
        });

        const team = await context.client.team.create({
            data: {
                name: "Team X",
                creatorId: user.id
            }
        });

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

    }

    const updatedUser = await context.client.user.findUnique({
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
                    avatar: true
                }
            }
        },
    });

    if (!updatedUser) {
        throw new Error("user not found , verification failed");
    }


    return {
        accessToken,
        refreshToken,
        user: updatedUser
    }

}
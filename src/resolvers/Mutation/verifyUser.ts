import { EMAIL_VERIFICATION_SECRET } from "../../globals";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken, InterfaceCreateAccessToken, InterfaceCreateRefreshToken } from "../../utility/auth";

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
            username: true,
            firstName: true,
            lastName: true,
            profile: {
                select: {
                    id: true,
                    tokenVersion: true
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
        username: user.username,
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
            tokenVersion: user.profile.tokenVersion + 1,
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

    const updatedUser = await context.client.user.findUnique({
        where: {
            email: decoded.email,
        },
        select: {
            id: true,
            email: true,
            username: true,
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
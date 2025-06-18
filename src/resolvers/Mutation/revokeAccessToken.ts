import { REFRESH_TOKEN_SECRET } from "../../globals";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";
import jwt from "jsonwebtoken"
import { createAccessToken, createRefreshToken, InterfaceCreateAccessToken, InterfaceCreateRefreshToken } from "../../utility/auth";

export const revokeAccessToken: MutationResolvers["revokeAccessToken"] = async (_, args, context) => {
    const refreshToken = args.refreshToken;

    const decoded = jwt.verify(refreshToken as string, REFRESH_TOKEN_SECRET as string) as InterfaceCreateRefreshToken

    const user = await context.client.user.findUnique({
        where: {
            id: decoded.userId,
        },
        include: {
            profile: true
        },
    });

    if (!user || !user.profile) {
        const error = new Error("User not found");
        error.name = "UserNotFoundError";
        throw error;
    }

    const isValid = (user.profile.tokenVersion !== decoded.tokenVersion) && (user.profile.token !== refreshToken)
    if (isValid) {
        const error = new Error("Invalid Token");
        error.name = "TokenVersionMismatchError";
        throw error;
    }

    const accessTokenPayload: InterfaceCreateAccessToken = {
        userId: user.id,
        email: user.email,
        username: user.username,
    }

    const newAccessToken = createAccessToken(accessTokenPayload);

    const refreshTokenPayload: InterfaceCreateRefreshToken = {
        userId: user.id,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        email: user.email,
        tokenVersion: user.profile.tokenVersion,
    }

    const newRefreshToken = createRefreshToken(refreshTokenPayload);

    // Increment the token version to invalidate the current refresh token
    await context.client.userProfile.update({
        where: {
            userId: user.id,
        },
        data: {
            tokenVersion: user.profile?.tokenVersion ? user.profile.tokenVersion + 1 : 1,
        },
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
}
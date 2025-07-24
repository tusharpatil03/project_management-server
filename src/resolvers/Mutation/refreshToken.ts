import { REFRESH_TOKEN_SECRET } from "../../globals";
import { MutationResolvers } from "../../types/generatedGraphQLTypes";
import jwt from "jsonwebtoken"
import { createAccessToken, createRefreshToken, InterfaceCreateAccessToken, InterfaceCreateRefreshToken, revokeRefreshToken } from "../../utility/auth";

export const refreshToken: MutationResolvers["refreshToken"] = async (_, args, context) => {
    console.log("ENDPOINT HIT BY REACT CLIENT");
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

    // console.log((user.profile.tokenVersion === decoded.tokenVersion) && (user.profile.token === refreshToken));
    // console.log("user token version:", user.profile.tokenVersion, "decoded token version:", decoded.tokenVersion);
    // console.log(user.profile.token, refreshToken);


    const isValid = (user.profile.tokenVersion === decoded.tokenVersion) && (user.profile.token === refreshToken)
    if (!isValid) {
        await revokeRefreshToken(user.id);
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
        firstName: user.firstName,
        lastName: user.lastName,
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
            token: newRefreshToken,
            tokenVersion: {
                increment: 1
            },
        },
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
}
import 'dotenv/config';

export const DATABASE_URL = process.env.DATABASE_URL;
export const SEVER_PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const UNAUTHORIZED_USER = Object.freeze({
    code: "user.unauthorized",
    message: "UnauthorizedError"
})

export const UNAUTHENTICATED_ERROR = Object.freeze({
    code: "user.unauthenticated",
    message: "UnauthenticatedError"
})
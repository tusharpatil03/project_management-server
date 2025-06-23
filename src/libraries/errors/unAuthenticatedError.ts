import { ApplicationError } from "./applicationError";

export class UnAuthenticatedError extends ApplicationError {
    constructor(message = 'UnauthenticatedError',
        code: string | null = null,) {
        const errorJson = [
            {
                message: message,
                code: code,
            }
        ]
        super(errorJson, 401, message)
    }
}
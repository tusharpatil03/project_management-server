import { ApplicationError } from './applicationError';

export class UnauthorizedError extends ApplicationError {
  constructor(
    message = 'UnauthorizedError',
    code: string | null = null,
  ) {
    const errorJson = [
      {
        message,
        code
      },
    ];
    super(errorJson, 403, message);
  }
}

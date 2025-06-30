import { ApplicationError } from './applicationError';

export class conflictError extends ApplicationError {
  constructor(
    message = 'Conflict',
    code: string | null = null,
  ) {
    const errorJson = [
      {
        message,
        code
      },
    ];
    super(errorJson, 404, message);
  }
}

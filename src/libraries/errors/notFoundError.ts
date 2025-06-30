import { ApplicationError } from './applicationError';

export class notFoundError extends ApplicationError {
  constructor(
    message = 'Not Found',
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

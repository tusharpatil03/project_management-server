export interface InterfaceError {
  message: string;
  code: string | null;
  param: string | null;
  metadata?: Record<string, string>;
}

export class ApplicationError extends Error {
  public errors: InterfaceError[];
  public httpCode: number;

  constructor(errors: InterfaceError[], httpCode = 422, message = 'Error') {
    super(message); // Call the constructor of the superclass Error
    this.errors = errors; // Assign the errors to the instance
    this.httpCode = httpCode; // Assign the HTTP status code to the instance
  }
}

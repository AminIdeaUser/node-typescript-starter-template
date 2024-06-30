import httpStatus from 'http-status';

export default class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = httpStatus.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

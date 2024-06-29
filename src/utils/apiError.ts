import httpStatus from 'http-status';

export default class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || httpStatus.BAD_REQUEST;
    this.isOperational = true;
  }
}

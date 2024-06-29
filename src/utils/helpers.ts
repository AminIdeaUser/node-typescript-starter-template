import { Request, Response, NextFunction } from 'express';

const getPaginateConfig = (queryParams: { [key: string]: string | undefined }) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    ...filters
  } = queryParams;
  const options = { page, limit, sortBy, sortOrder };
  return { filters, options };
};

// eslint-disable-next-line @typescript-eslint/ban-types
const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};

export { getPaginateConfig, catchAsync };

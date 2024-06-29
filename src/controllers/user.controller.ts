import { Request, Response } from 'express';

import { catchAsync } from '../utils/helpers';

const updateMe = catchAsync((req: Request, res: Response<JSend>) => {
  res.json({
    status: 'success',
  });
});

export { updateMe };

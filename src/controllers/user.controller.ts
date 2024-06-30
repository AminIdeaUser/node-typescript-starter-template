import { Request, Response } from 'express';

import { catchAsync } from '../utils/helpers';
import { userService } from '../services';
import { userValidation } from '../validations';

const updateMe = catchAsync(
  async (req: Request<object, object, userValidation.IUpdateMe['body']>, res: Response<JSend>) => {
    const updatedUser = await userService.updateUserById(req.user._id, req.body);
    res.json({
      status: 'success',
      data: updatedUser,
    });
  }
);

export { updateMe };

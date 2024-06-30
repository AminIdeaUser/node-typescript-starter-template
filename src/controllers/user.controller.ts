import { Request, Response } from 'express';

import { catchAsync } from '../utils/helpers';
import { userService } from '../services';
import { userValidation } from '../validations';
import { IStandardUser } from '../models';

const updateMe = catchAsync(
  async (req: Request<object, object, userValidation.IUpdateMe['body']>, res: Response<JSend>) => {
    const updatedUser = await userService.updateUserById(req.user._id, req.body);
    res.json({
      status: 'success',
      data: updatedUser,
    });
  }
);

const updateMyPreferences = catchAsync(
  async (
    req: Request<object, object, userValidation.IUpdateMyPreferences['body']>,
    res: Response<JSend>
  ) => {
    const updatedUser = await userService.updateStandardUserPreferences(
      req.user as IStandardUser,
      req.body
    );
    res.json({
      status: 'success',
      data: updatedUser,
    });
  }
);

export { updateMe, updateMyPreferences };

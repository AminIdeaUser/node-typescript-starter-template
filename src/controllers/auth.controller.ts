import { Request, Response } from 'express';
import httpStatus from 'http-status';

import config from '../config/env.config';
import { catchAsync } from '../utils/helpers';
import ApiError from '../utils/apiError';

const generateToken = catchAsync(async (req: Request, res: Response) => {
  if (config.env !== 'development')
    throw new ApiError('Could not find the route you are looking for', httpStatus.NOT_FOUND);

  const token = await admin.auth().createCustomToken(req.body.uid);
  const {
    data: { idToken },
  } = await axios({
    url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${config.firebase.api_key}`,
    method: 'post',
    data: {
      token,
      returnSecureToken: true,
    },
    json: true,
  });

  res.json({
    data: {
      status: true,
      token: idToken,
    },
  });
});

export { generateToken };

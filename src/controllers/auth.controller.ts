import { Request, Response } from 'express';
import httpStatus from 'http-status';
import admin from 'firebase-admin';

import config from '../config/env.config';
import { catchAsync } from '../utils/helpers';
import ApiError from '../utils/apiError';
import { authValidation } from '../validations';

const generateToken = catchAsync(
  async (req: Request<object, object, authValidation.IGenerateToken['body']>, res: Response) => {
    if (config.env !== 'development')
      throw new ApiError('Could not find the route you are looking for', httpStatus.NOT_FOUND);

    const token = await admin.auth().createCustomToken(req.body.uid);
    const response = await fetch(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${config.firebase.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, returnSecureToken: true }),
      }
    );

    const { idToken } = await response.json();

    res.json({
      data: {
        status: true,
        token: idToken,
      },
    });
  }
);

export { generateToken };

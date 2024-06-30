import { Request, Response } from 'express';
import httpStatus from 'http-status';
import admin from 'firebase-admin';

import config from '../config/env.config';
import { catchAsync } from '../utils/helpers';
import ApiError from '../utils/apiError';
import { authValidation } from '../validations';
import { userService } from '../services';
import { fileUploadService } from '../microservices';

const generateToken = catchAsync(
  async (
    req: Request<object, object, authValidation.IGenerateToken['body']>,
    res: Response<JSend>
  ) => {
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
      status: 'success',
      data: idToken,
    });
  }
);

const registerUser = catchAsync(
  async (
    req: Request<object, object, authValidation.IRegisterUser['body']>,
    res: Response<JSend>
  ) => {
    if (req.user)
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ status: 'fail', message: 'User already exists' });

    const { userPayload: payload } = res.locals;

    const [photo] = await fileUploadService.s3Upload([req.file!], 'users');

    const user = await userService.createStandardUser({
      ...req.body,
      photo,
      email: payload.email,
      firebaseUid: payload.uid,
      firebaseSignInProvider: payload.firebase.sign_in_provider,
    });

    res.status(httpStatus.CREATED).json({ status: 'success', data: user });
  }
);

export { generateToken, registerUser };

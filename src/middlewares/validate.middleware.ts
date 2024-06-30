import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import AppError from '../utils/apiError';

const validateSchema =
  (zodSchema: z.AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    // Check if content-type of request is supported
    // NOTE: Postman does not send content-type header if req.body is empty
    if (Object.keys(req.body).length && !req.is(['application/json', 'multipart/form-data']))
      return next(new AppError(`${req.get('content-type')} is not supported`));

    // Cherry pick properties from req object to be validated
    const validationFields: Array<'query' | 'params' | 'body' | 'file' | 'files'> = [
      'query',
      'params',
      'body',
      'file',
      'files',
    ];

    const objectToValidate: { [key: string]: unknown } = { params: {} };

    validationFields.forEach(field => {
      objectToValidate[field] = req[field];
    });

    // Zod will also perform type casting during validation
    // However, the original req object will not be modified by the transformed output of zod.safeParse
    const { success, data: transformedData, error } = zodSchema.safeParse(objectToValidate);
    if (!success) {
      // Extract and format error messages to be sent to the client
      const errorMessage = error.errors
        .map(err => `${err.message}: ${err.path.join('.')}`)
        .join(';');
      return next(new AppError(errorMessage));
    }

    // Manually set transformed output on the req object
    validationFields.forEach(field => {
      req[field] = transformedData[field];
    });

    next();
  };

export default validateSchema;

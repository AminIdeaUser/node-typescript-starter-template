import { ObjectId } from 'mongoose';

import { IUser } from './src/models/user.model';

declare global {
  type UserRole = 'StandardUser' | 'Admin';

  type JSend<T = unknown> = {
    status: 'success' | 'fail' | 'error';
    message?: string;
    data?: T;
  };

  type MongoObjectId = ObjectId;

  namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}

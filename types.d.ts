import { Document } from 'mongoose';
import { IUser } from './src/models/user.model';

declare global {
  type UserRole = 'StandardUser' | 'Admin';

  type JSend<T = object> = {
    status: 'success' | 'fail' | 'error';
    message?: string;
    data?: { [key: string]: T };
  };

  namespace Express {
    export interface Request {
      user: Document & IUser;
    }
  }
}

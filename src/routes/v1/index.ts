import express, { Request, Response } from 'express';

import userRouter from './user.routes';
import authRouter from './auth.routes';

const router = express.Router();

router
  .use('/auth', authRouter)
  .use('/users', userRouter);

router.get('/health', (req: Request, res: Response<JSend>) =>
  res.json({
    status: 'success',
    message: 'Server is healthy (❤️) and wealthy (💲)!',
  })
);

export default router;

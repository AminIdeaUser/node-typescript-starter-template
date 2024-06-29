import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/health', (req: Request, res: Response<JSend>) => {
  res.json({
    status: 'success',
    message: 'Server is healthy (❤️) and wealthy (💲)!',
  });
});

export default router;

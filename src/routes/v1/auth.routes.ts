import express from 'express';

import { validate, firebaseAuth } from '../../middlewares';
import { authController } from '../../controllers';
import { authValidation } from '../../validations';

const router = express.Router();

router.post(
  '/token',
  firebaseAuth('All'),
  validate(authValidation.generateToken),
  authController.generateToken
);

export default router;

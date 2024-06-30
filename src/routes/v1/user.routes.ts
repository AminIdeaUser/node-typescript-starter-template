import express from 'express';

import { firebaseAuth, validate } from '../../middlewares';
import { userValidation } from '../../validations';
import { userController } from '../../controllers';

const router = express.Router();

router.patch(
  '/me',
  firebaseAuth('All'),
  validate(userValidation.updateMe),
  userController.updateMe
);

export default router;

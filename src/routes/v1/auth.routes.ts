import express from 'express';

import { firebaseAuth, validate } from '../../middlewares';
import { authController } from '../../controllers';
import { authValidation } from '../../validations';
import { fileUploadService } from '../../microservices';

const router = express.Router();

router.post('/token', validate(authValidation.generateToken), authController.generateToken);

router.post(
  '/register',
  firebaseAuth('All'),
  fileUploadService.multerUpload.single('photo'),
  validate(authValidation.registerUser),
  authController.registerUser
);

export default router;

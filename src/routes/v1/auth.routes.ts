import express from 'express';

import { validate } from '../../middlewares';
import { authController } from '../../controllers';
import { authValidation } from '../../validations';

const router = express.Router();

router.post('/token', validate(authValidation.generateToken), authController.generateToken);

export default router;

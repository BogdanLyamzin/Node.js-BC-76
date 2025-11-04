import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUserController,
  loginUserController,
  refreshSessionController,
  logoutUserController,
} from '../controllers/authControllers.js';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const authRoutes = Router();

authRoutes.post(
  '/register',
  celebrate(registerUserSchema),
  registerUserController,
);

authRoutes.post('/login', celebrate(loginUserSchema), loginUserController);

authRoutes.post('/refresh', refreshSessionController);

authRoutes.post('/logout', logoutUserController);

export default authRoutes;

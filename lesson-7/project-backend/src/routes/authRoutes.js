import { Router } from "express";
import { celebrate } from 'celebrate';

import { registerUserController } from "../controllers/authControllers.js";

import { registerUserSchema } from "../validations/authValidation.js";

const authRoutes = Router();

authRoutes.post("/register", celebrate(registerUserSchema), registerUserController);

export default authRoutes;
import { Router } from "express";
import { AuthenticationController } from "../../controllers/authentication/authentication.controller";
import { userLoginSchema, validateUserLogin } from "../../middlewares/validateUserLogin.middleware copy";

export const authRoutes = Router();

authRoutes.post("", validateUserLogin(userLoginSchema), AuthenticationController.createSession);
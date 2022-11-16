import { Router } from "express";
import { UserController } from "../../controllers/users/user.controller";
import { validateUserCreate, userCreateSchema } from "../../middlewares/validateUserCreate.middleware";

export const userRoutes = Router();

userRoutes.post("", validateUserCreate(userCreateSchema), UserController.createUserControler);
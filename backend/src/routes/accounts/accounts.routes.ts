import { Router } from "express";
import { AccountController } from "../../controllers/accounts/accounts.controller";
import { ensureAuthMiddleware } from "../../middlewares/ensureAuth.middleware";

export const accountsRoutes = Router();

accountsRoutes.get("", ensureAuthMiddleware, AccountController.listBalance);
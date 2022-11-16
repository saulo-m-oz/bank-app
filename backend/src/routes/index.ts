import { Router } from "express";
import { userRoutes } from "./users/users.routes";
import { transactionsRoutes } from "./transactions/transactions.routes";
import { accountsRoutes } from "./accounts/accounts.routes";
import { authRoutes } from "./authentication/authentication.routes";

export const appRoutes = Router();

appRoutes.use("/users", userRoutes);
appRoutes.use("/auth", authRoutes);
appRoutes.use("/account", accountsRoutes);
appRoutes.use("/transactions", transactionsRoutes);
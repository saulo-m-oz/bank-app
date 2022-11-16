import { Router } from "express";
import { TransactionController } from "../../controllers/transactions/transactions.controller";
import { ensureAuthMiddleware } from "../../middlewares/ensureAuth.middleware";
import { ensureNotSameAcc } from "../../middlewares/ensureNotSameAcc.middleware";
import { transactionCreateSchema, validateTransactionCreate } from "../../middlewares/validateTransactionData";

export const transactionsRoutes = Router();

transactionsRoutes.post("", ensureAuthMiddleware, validateTransactionCreate(transactionCreateSchema), ensureNotSameAcc, TransactionController.createTransaction);
transactionsRoutes.get("", ensureAuthMiddleware, TransactionController.listAllTransactions);
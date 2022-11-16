import { Request, Response } from "express";
import { createTransactionService } from "../../services/transactions/createTransaction.service";
import { listAllTransactionsService } from "../../services/transactions/listAllTransactions.service";

export class TransactionController {
  static async createTransaction(req: Request, res: Response) {
    const id = req.user.accountId; // ID utilizado para acessar a conta do usuário cash-out
    const cashInData = req.body; // ID utilizado para acessar a conta do usuário cash-in
    const transaction = await createTransactionService(id, cashInData);
    return res.status(201).json(transaction);
  }

  static async listAllTransactions(req: Request, res: Response) {
    const id = req.user.accountId; // ID utilizado para acessar a conta do usuário
    const transactions = await listAllTransactionsService(id);
    return res.status(200).json(transactions);
  }

  static async listTransactionByID(req: Request, res: Response) {
    const id = req.user.accountId; // ID utilizado para acessar a conta do usuário
  }
}

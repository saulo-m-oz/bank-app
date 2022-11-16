import { Transaction } from "../../entities/transaction.entity";
import { Account } from "../../entities/account.entity";
import { AppError } from "../../errors/appError";

import AppDataSource from "../../data-source";

export const listAllTransactionsService = async (id: string) => {
  const transactionsRepo = AppDataSource.getRepository(Transaction);
  const accountRepo = AppDataSource.getRepository(Account);

  const account = await accountRepo.findOneBy({ id });
  if (!account)
    throw new AppError(400, "Ocorreu um erro. Por favor contate o suporte.");

  const transactions = transactionsRepo.find({
    where: [
      {
        creditedAccount: {
          id: account.id,
        },
      },
      {
        debitedAccount: {
          id: account.id,
        },
      },
    ],
  });

  return transactions;
};

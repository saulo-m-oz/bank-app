import { Transaction } from "../../entities/transaction.entity";
import { Account } from "../../entities/account.entity";
import { AppError } from "../../errors/appError";

import AppDataSource from "../../data-source";

export const listAllTransactionsService = async (id: string, query: any) => {
  const transactionsRepo = AppDataSource.getRepository(Transaction);
  const accountRepo = AppDataSource.getRepository(Account);

  const account = await accountRepo.findOneBy({ id });
  if (!account)
    throw new AppError(400, "Ocorreu um erro. Por favor contate o suporte.");

  if (query.date || query.type) {
    if (query.type && !query.date) {
      const transactions = await transactionsRepo
        .createQueryBuilder("transaction")
        .where(`transaction.${query.type} = :id`, { id: account.id })
        .getMany();
      return transactions;
    }

    if (query.date && !query.type) {
      const transactions = await transactionsRepo.find();
      const filteredTransactions = transactions.filter((transaction) => {
        const newDate = transaction.createdAt.toLocaleDateString();
        console.log("NEW DATE:" +  newDate);
        console.log("DATE:" +  query.date);
        if (transaction.createdAt.toLocaleDateString().includes(query.date))
          return transaction;
      });
      return filteredTransactions;
    }

    const transactions = await transactionsRepo
      .createQueryBuilder("transaction")
      .where(`transaction.${query.type} = :id`, { id: account.id })
      .getMany();
    const filteredTransactions = transactions.filter((transaction) => {
      if (transaction.createdAt.toLocaleDateString().includes(query.date))
        return transaction;
    });
    return filteredTransactions;
  }

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

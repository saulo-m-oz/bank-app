import { User } from "../../entities/user.entity";
import { Account } from "../../entities/account.entity";
import { Transaction } from "../../entities/transaction.entity";
import { AppError } from "../../errors/appError";
import { ICashInData } from "../../interfaces/transactions";

import AppDataSource from "../../data-source";
import { instanceToPlain } from "class-transformer";

export const createTransactionService = async (
  id: string,
  cashInData: ICashInData
) => {
    
  // Acessa o repo de accounts e verifica se o balance do cashOut é menor que amount
  const accountRepository = AppDataSource.getRepository(Account);
  const cashOutAccount = await accountRepository.findOneBy({ id });

  let cashOutBalance = Number(cashOutAccount!.balance);

  if (cashOutBalance < cashInData.amount)
    throw new AppError(401, "Transação não concluída. Balance insuficiente.");

  // Acessa o repo de user para encontrar o user de cashIn pelo username
  const userRepository = AppDataSource.getRepository(User);

  // Procura pelo usuário a partir do username fornecido no request
  const cashInUser = await userRepository.findOne({
    where: { username: cashInData.username },
    loadRelationIds: true,
  });

  // Validação de user
  if (!cashInUser)
    throw new AppError(
      400,
      "Conta de transferência não encontrada. Verifique o username inserido."
    );

  // Baseado no user encontrado, procura pela conta
  const cashInAccount = await accountRepository.findOne({
    where: { id: String(cashInUser.account) },
  });

  // Executa a transação
  cashOutBalance -= cashInData.amount;
  const newBalance = Number(cashInAccount!.balance) + cashInData.amount;

  await accountRepository.update(id, {
    balance: cashOutBalance,
  });

  await accountRepository.update(cashInAccount!.id, {
    balance: newBalance,
  });

  // Acessa tabela de transactions
  const transactionRepository = AppDataSource.getRepository(Transaction);

  // Cria e Salva a transação na tabela
  const newTransaction = transactionRepository.create({
    value: cashInData.amount,
    creditedAccount: cashInAccount!,
    debitedAccount: cashOutAccount!,
  });

  transactionRepository.save(newTransaction);

  return instanceToPlain(newTransaction);
};

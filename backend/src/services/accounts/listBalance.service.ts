import { AppError } from "../../errors/appError";
import { Account } from "../../entities/account.entity";

import AppDataSource from "../../data-source";

export const listBalanceService = async (id: string) => {
  const accountRepo = AppDataSource.getRepository(Account);

  const userAccount = await accountRepo.findOneBy({id});
  if(!userAccount) throw new AppError(400, "Houve um erro inesperado. Por favor, contate o suporte.")

  return userAccount;
};

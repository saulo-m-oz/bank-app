import { IUserCreate } from "../../interfaces/users";
import { AppError } from "../../errors/appError";
import { hash } from "bcryptjs";

import { User } from "../../entities/user.entity";
import { Account } from "../../entities/account.entity";

import AppDataSource from "../../data-source";

export const createUserService = async ({ username, password }: IUserCreate) => {

    // Acessando Repositórios
    const userRepository = AppDataSource.getRepository(User);
    const accountRepository = AppDataSource.getRepository(Account);

    // Verficação de Usuário já existente
    const userAlreadyExists = await userRepository.findOneBy({username});
    if (userAlreadyExists) throw new AppError(400, "Usuário já cadastrado.");

    // Hash de senha
    const hashedPassword = await hash(password, 10);

    // Criação de uma nova Account para User
    const userAccount = accountRepository.create();
    await accountRepository.save(userAccount);

    // Criação de User
    const user = userRepository.create({
        username,
        password: hashedPassword,
        account: userAccount
    });
    
    await userRepository.save(user);

    return user;
};

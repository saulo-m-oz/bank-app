import { IUserLogin } from "../../interfaces/users";
import { AppError } from "../../errors/appError";
import { compare } from "bcryptjs";
import { User } from "../../entities/user.entity";

import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createSessionService = async ({
  username,
  password,
}: IUserLogin) => {

  // Acessando UserRepo para procurar pelo usuário e validar se ele existe
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { username },
    loadRelationIds: true,
  });
  
  if (!user) throw new AppError(401, "Usuário ou senha inválido.");
  
  // Caso user exista, verifica se a senha informada é a mesma cadastrada
  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) throw new AppError(401, "Usuário ou senha inválido.");

  // Caso seja, é gerado um token com validade de 24h, salvando o user.id no subject
  const token = jwt.sign(
    { accountId: user.account, username: user.username },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};

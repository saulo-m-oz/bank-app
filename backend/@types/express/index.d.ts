import * as express from "express";
import { Account } from "../../src/entities/account.entity";
import { IUserCreate, IUserLogin } from "../../src/interfaces/users";


declare global {
  namespace Express {
    interface Request {
      newUser: IUserCreate; // Criação de dados validados no Request para ser utilizado no controller de criação de usuário
      loginInfo: IUserLogin; // Criação de dados validados no Request para ser utilizado no controller de login
      user: {
        id: string;
        accountId: string;
        username: string;
      }
    }
  }
}

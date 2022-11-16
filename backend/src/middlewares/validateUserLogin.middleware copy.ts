import { Request, Response, NextFunction } from "express";
import { IUserLogin } from "../interfaces/users";
import { SchemaOf } from "yup";
import { AppError } from "../errors/appError";
import * as yup from "yup";

// Import e inicializa o YupPassword para adicionar novas verificações ao Yup
import YupPassword from "yup-password";
YupPassword(yup);

// User Schema para validação dos dados de login
export const userLoginSchema: SchemaOf<IUserLogin> = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

// Função para validação de dados do Create User
export const validateUserLogin =
  (schema: SchemaOf<IUserLogin>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // TryCatch para acessar os dados enviados pelo body da requisição
    try {
      const createUserLogin = req.body;
      // TryCatch para validação de dados com o Yup utilizando schema.validate()
      try {
        const validatedData = await schema.validate(createUserLogin, {
          abortEarly: false,
          stripUnknown: true,
        });
        req.loginInfo = validatedData;
        next();
      } catch (err: any) {
        throw new AppError(400, err.errors?.join(", "));
      }
    } catch (error) {
      next(error);
    }
  };

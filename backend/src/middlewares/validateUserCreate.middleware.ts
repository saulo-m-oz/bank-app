import { Request, Response, NextFunction } from "express";
import { IUserCreate } from "../interfaces/users";
import { SchemaOf } from "yup";
import { AppError } from "../errors/appError";
import * as yup from "yup";

// Import e inicializa o YupPassword para adicionar novas verificações ao Yup
import YupPassword from "yup-password";
YupPassword(yup);

// User Schema para validação dos dados de registro
export const userCreateSchema: SchemaOf<IUserCreate> = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup.string().min(8).minUppercase(1).minNumbers(1).required(),
});

// Função para validação de dados do Create User
export const validateUserCreate =
  (schema: SchemaOf<IUserCreate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // TryCatch para acessar os dados enviados pelo body da requisição
    try {
      const createUserData = req.body;
      // TryCatch para validação de dados com o Yup utilizando schema.validate()
      try {
        const validatedData = await schema.validate(createUserData, {
          abortEarly: false,
          stripUnknown: true,
        });
        req.newUser = validatedData;
        next();
      } catch (err: any) {
        throw new AppError(400, err.errors?.join(", "));
      }
    } catch (error) {
      next(error);
    }
  };

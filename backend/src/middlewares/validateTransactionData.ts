import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { AppError } from "../errors/appError";
import { ICashInData } from "../interfaces/transactions";

import * as yup from "yup";

export const transactionCreateSchema: SchemaOf<ICashInData> = yup
  .object()
  .shape({
    username: yup.string().required(),
    amount: yup.number().required(),
  });

export const validateTransactionCreate =
  (schema: SchemaOf<ICashInData>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionData = req.body;
      try {
        await schema.validate(transactionData, {
          abortEarly: false,
          stripUnknown: true,
        });
        next();
      } catch (err: any) {
        throw new AppError(400, err.errors?.join(", "));
      }
    } catch (error) {
      next(error);
    }
  };

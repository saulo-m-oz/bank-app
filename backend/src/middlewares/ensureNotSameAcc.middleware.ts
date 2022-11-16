import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const ensureNotSameAcc = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.username == req.user.username) throw new AppError(401, "Transferências para mesma conta não são permitidas.")
    next();
}

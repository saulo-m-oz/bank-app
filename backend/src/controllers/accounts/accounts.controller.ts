import { Request, Response } from "express";
import { listBalanceService } from "../../services/accounts/listBalance.service";

export class AccountController{
    static async listBalance(req: Request, res: Response){
        const id = req.user.accountId;
        const accountBalance = await listBalanceService(id);
        return res.status(200).json(accountBalance);
    }
}
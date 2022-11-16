import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";

import { createSessionService } from "../../services/authentication/createSession.service";

export class AuthenticationController {
  static async createSession(req: Request, res: Response) {
    // Acessando os dados pelo request
    const loginData: IUserLogin = req.loginInfo;

    // Realizando login e salvando token
    const token = await createSessionService(loginData);

    return res.status(200).json({token});
  }
}

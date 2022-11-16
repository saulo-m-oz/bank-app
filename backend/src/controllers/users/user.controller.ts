import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserCreate } from "../../interfaces/users";

// Import de Services
import { createUserService } from "../../services/users/createUser.service";

export class UserController{

    static async createUserControler(req: Request, res: Response){
        // Acessando os dados validados no yup pelo request
        const userData: IUserCreate = req.newUser;

        // Criando novo usuário
        const createdUser = await createUserService(userData);

        // Retornando usuário criado sem a visualização de senha e com statusCode 201
        return res.status(201).json(instanceToPlain(createdUser));

    }

}
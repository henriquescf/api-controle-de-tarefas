import { Request, Response } from "express";
import { UserServices } from "../services/users.services";
import { container, injectable } from "tsyringe";

@injectable()
export class UsersControllers{
    async login(req: Request, res: Response): Promise<Response>{
        const userServices = container.resolve(UserServices)
        const response = await userServices.login(req.body)
        return res.status(200).json(response)
    }

    async register(req: Request, res: Response): Promise<Response>{
        const userServices = container.resolve(UserServices)
        const response = await userServices.register(req.body)
        return res.status(201).json(response)
    }

    async profile(req: Request, res: Response): Promise<Response>{
        const { id } = res.locals.decode
        const userServices = container.resolve(UserServices)
        const response = await userServices.profile(id)
        return res.status(200).json(response)
    }
}
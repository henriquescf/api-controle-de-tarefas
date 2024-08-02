import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma"

export class DoesEmailExist{
    static async execute(req: Request, res: Response, next: NextFunction){
        const email = await prisma.user.findFirst({where: {email: req.body.email}})
        if(email){
            return res.status(409).json({ message: "This email is already registered"});
        }
        next()
    }
}
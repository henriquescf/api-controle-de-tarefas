import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma"

export class IsTheTaskOwner{
    static async execute(req: Request, res: Response, next: NextFunction){
        const { id } = res.locals.decode
        const verifyTask = await prisma.task.findFirst({
            where: {
                id: Number(req.params.id),
                AND: {userId: id}
            }
        })

        if(!verifyTask){
            return res.status(403).json({ message: "This user is not the task owner"});
        }
        next()
    }
}
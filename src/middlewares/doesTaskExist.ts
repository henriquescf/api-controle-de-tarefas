import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma"

export class DoesTaskExist{
    static async execute(req: Request, res: Response, next: NextFunction){
        const task = await prisma.task.findFirst({where: { id: Number(req.params.id)}})
        if(!task){
            return res.status(404).json({ message: "Task not found"});
        }
        next()
    }
}
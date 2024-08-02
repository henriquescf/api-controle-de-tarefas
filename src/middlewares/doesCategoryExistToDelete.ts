import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma"

export class DoesCategoryExistToDelete{
    static async execute(req: Request, res: Response, next: NextFunction){
        const category = await prisma.category.findFirst({where: { id: Number(req.params.id) }})
        if(!category){
            return res.status(404).json({ message: "Category not found"});
        }
        next()
    }
}
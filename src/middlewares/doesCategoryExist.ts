import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma"

export class DoesCategoryExist{
    static async execute(req: Request, res: Response, next: NextFunction){
            const category = await prisma.category.findFirst({where: { id: req.body.id }})
            if(!category){
                return res.status(404).json({ message: "Category not found"});
            }
        next()
    }
}
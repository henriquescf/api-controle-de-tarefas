import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma"

export class DoesTaskCategoryExist{
    static async execute(req: Request, res: Response, next: NextFunction){
        if(req.body.categoryId){
            const category = await prisma.category.findFirst({where: { id: req.body.categoryId }})

            if(!category){
                return res.status(404).json({ message: "Category not found"});
            }
        }
        
        next()
    }
}
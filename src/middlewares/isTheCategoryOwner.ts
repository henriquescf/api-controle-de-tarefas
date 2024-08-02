import { NextFunction, Request, Response } from "express"
import { prisma } from "../database/prisma"

export class IsTheCategoryOwner{
    static async execute(req: Request, res: Response, next: NextFunction){
        const {id} = res.locals.decode
        const verifyCategory = await prisma.category.findFirst({
            where: {
                id: Number(req.params.id),
                AND: {userId: id}
            }
        })

        if(!verifyCategory){
            return res.status(403).json({ message: "This user is not the category owner"});
        }
        
        next()
    }
}
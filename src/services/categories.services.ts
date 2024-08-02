import { prisma } from "../database/prisma"
import { TCreateCategoryBody } from "../interfaces/categories.interfaces"

export class CategoriesServices{
    async createCategory(body: TCreateCategoryBody, userId: number){
        body.userId = userId
        return await prisma.category.create({data: body})
    }

    async deleteCategory(categoryId: string, userId: number){
        if(await prisma.category.findFirst({
            where: {
                id: Number(categoryId),
                AND: {userId: userId}
            }
        })){
            return await prisma.category.delete({where: {id: Number(categoryId)}})
        }
    }
}
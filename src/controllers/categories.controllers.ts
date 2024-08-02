import { Request, Response } from "express";
import { CategoriesServices } from "../services/categories.services";
import { container, injectable } from "tsyringe";

@injectable()
export class CategoriesControllers{
    async createCategory(req: Request, res: Response): Promise<Response>{
        const { id } = res.locals.decode
        const categoriesServices = container.resolve(CategoriesServices)
        const response = await categoriesServices.createCategory(req.body, id)
        return res.status(201).json(response)
    }

    async deleteCategory(req: Request, res: Response): Promise<Response>{
        const { id } = res.locals.decode
        const categoriesServices = container.resolve(CategoriesServices)
        const response = await categoriesServices.deleteCategory(req.params.id, id)
        return res.status(204).json(response)
    }
}
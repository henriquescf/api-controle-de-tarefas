import { Request, Response } from "express";
import { TasksServices } from "../services/tasks.services";
import { container, injectable } from "tsyringe";

@injectable()
export class TasksControllers{
    async createTask(req: Request, res: Response): Promise<Response>{
        const { id } = res.locals.decode
        const tasksServices = container.resolve(TasksServices)
        const response = await tasksServices.createTask(req.body, id)
        return res.status(201).json(response)
    }

    async getTask(req: Request, res: Response){
        const { id } = res.locals.decode
        const tasksServices = container.resolve(TasksServices)
        const response = await tasksServices.getTasks(id, req.query.category?.toString())
        res.status(200).json(response)
    }

    async getOneTask(req: Request, res: Response): Promise<Response>{
        const { id } = res.locals.decode
        const tasksServices = container.resolve(TasksServices)
        const response = await tasksServices.getOneTask(req.params.id, id)
        return res.status(200).json(response)
    }

    async editTask(req: Request, res: Response): Promise<Response>{
        const { id } = res.locals.decode
        const tasksServices = container.resolve(TasksServices)
        const response = await tasksServices.editTask(req.body, req.params.id, id)
        return res.status(200).json(response)
    }

    async deleteTask(req: Request, res: Response): Promise<Response>{
        const { id } = res.locals.decode
        const tasksServices = container.resolve(TasksServices)
        const response = await tasksServices.deleteTask(req.params.id, id)
        return res.status(204).json(response)
    }
}
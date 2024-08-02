import { prisma } from "../database/prisma";
import { TCreateTaskBody, TUpdateTaskBody } from "../interfaces/tasks.interfaces";

export class TasksServices{
    async createTask(body: TCreateTaskBody, userId: number){
        body.userId = userId
        return await prisma.task.create({
            data: body
        })
    }

    async getTasks(userId: number, param?: string) {
        if(param){
            return await prisma.task.findMany({
                where: {
                    category: {
                        name: {
                            contains: param, mode: "insensitive"
                        },
                        AND: {userId: userId}
                    }

                },
                include: {
                    category: true
                }
            })
        }

        return await prisma.task.findMany({
            where: {
                userId: userId
            },
            include: {category: true}})
    }

    async getOneTask(taskId: string, userId: number) {
        return await prisma.task.findFirst({ 
            where: {
                id: Number(taskId),
                AND: {userId: userId}
            },
        })
    }

    async editTask(body: TUpdateTaskBody, taskId: string, userId: number){
        return await prisma.task.update({
            where: {
              id: Number(taskId),
              AND: {userId: userId}
            },
            data: body,
          })
    }

    async deleteTask(taskId: string, userId: number){
        if(await prisma.task.findFirst({
            where: {
                id: Number(taskId),
                AND: {userId: userId}
            }
        })){
            return await prisma.task.delete({where: {id: Number(taskId)}})
        }
    }
}
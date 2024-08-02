import { Router } from "express";
import { TasksControllers } from "../controllers/tasks.controllers";
import { DoesCategoryExist } from "../middlewares/doesCategoryExist";
import { ValidateBody } from "../middlewares/validateBody";
import { createTaskSchema } from "../schemas/createTask.schema";
import { DoesTaskExist } from "../middlewares/doesTaskExist";
import { editTaskSchema } from "../schemas/editTask.schema";
import { DoesTaskCategoryExist } from "../middlewares/doesTaskCategoryExist";
import { verifyToken } from "../middlewares/verifyToken";
import { IsTheTaskOwner } from "../middlewares/isTheTaskOwner";
import { DoesQueryCategoryExist } from "../middlewares/doesQueryCategoryExist";

export const tasksRouter = Router()

const tasksController = new TasksControllers()

tasksRouter.post("/", verifyToken.execute, ValidateBody.execute({body: createTaskSchema}), DoesTaskCategoryExist.execute, tasksController.createTask)

tasksRouter.get("/", verifyToken.execute, DoesQueryCategoryExist.execute, tasksController.getTask)

tasksRouter.get("/:id", verifyToken.execute, IsTheTaskOwner.execute, DoesTaskExist.execute, tasksController.getOneTask)

tasksRouter.patch("/:id", verifyToken.execute, IsTheTaskOwner.execute, ValidateBody.execute({body: editTaskSchema}), DoesTaskExist.execute, DoesCategoryExist.execute, tasksController.editTask)

tasksRouter.delete("/:id", verifyToken.execute, IsTheTaskOwner.execute, DoesTaskExist.execute, tasksController.deleteTask)
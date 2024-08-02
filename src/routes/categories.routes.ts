import { Router } from "express";
import { CategoriesControllers } from "../controllers/categories.controllers";
import { ValidateBody } from "../middlewares/validateBody";
import { createCategorySchema } from "../schemas/createCategory.schema";
import { DoesCategoryExistToDelete } from "../middlewares/doesCategoryExistToDelete";
import { verifyToken } from "../middlewares/verifyToken";
import { IsTheCategoryOwner } from "../middlewares/isTheCategoryOwner";

export const categoriesRouter = Router()

const categoriesControllers = new CategoriesControllers()

categoriesRouter.post("/", verifyToken.execute, ValidateBody.execute({body: createCategorySchema}), categoriesControllers.createCategory)

categoriesRouter.delete("/:id", verifyToken.execute, IsTheCategoryOwner.execute, DoesCategoryExistToDelete.execute, categoriesControllers.deleteCategory)
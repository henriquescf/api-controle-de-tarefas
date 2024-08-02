import { Router } from "express";
import { UsersControllers } from "../controllers/users.controllers";
import { verifyToken } from "../middlewares/verifyToken";
import { registerUserSchema } from "../schemas/user.schema";
import { ValidateBody } from "../middlewares/validateBody";
import { DoesEmailExist } from "../middlewares/doesEmailExist";
import { loginUserSchema } from "../schemas/user.schema";

export const userRouter = Router()
const usersControllers = new UsersControllers()

userRouter.post("/", ValidateBody.execute({body: registerUserSchema}), DoesEmailExist.execute, usersControllers.register)
userRouter.post("/login", ValidateBody.execute({body: loginUserSchema}), usersControllers.login)
userRouter.get("/profile", verifyToken.execute, usersControllers.profile)
import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import { tasksRouter } from "./routes/tasks.routes";
import { categoriesRouter } from "./routes/categories.routes";
import { handleErrors } from "./middlewares/handleErrors";
import { userRouter } from "./routes/user.routes";

export const app = express();

app.use(cors())
app.use(json())
app.use("/tasks", tasksRouter)
app.use("/categories", categoriesRouter)
app.use("/users", userRouter)
app.use(helmet())
app.use(handleErrors.execute)
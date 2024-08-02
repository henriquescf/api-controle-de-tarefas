import { z } from "zod"

export const createTaskSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    categoryId: z.number().optional()
})
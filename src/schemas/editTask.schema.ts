import { z } from "zod"

export const editTaskSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    finished: z.boolean().optional(),
    categoryId: z.number().optional()
})
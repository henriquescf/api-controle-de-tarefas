import { z } from "zod"

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(1)
})

export const registerUserSchema = userSchema.omit({id: true})

export const loginUserSchema = userSchema.omit({id: true, name: true})

export const userReturn = userSchema.omit({password: true})
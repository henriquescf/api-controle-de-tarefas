import jwt from "jsonwebtoken"
import { TLoginReturn, TUserLoginBody, TUserRegisterBody, TUserReturn } from "../interfaces/user.interfaces"
import { prisma } from "../database/prisma"
import bcrypt from "bcrypt";
import { AppError } from "../errors/appError";
import { userReturn } from "../schemas/user.schema";

export class UserServices{
    async login(body: TUserLoginBody): Promise<TLoginReturn>{
        const user = await prisma.user.findFirst({where: {email: body.email}})
        
        if(!user){
            throw new AppError("User not exists", 404); 
        }
        
        const compare = await bcrypt.compare(body.password, user.password);

        if(!compare){
            throw new AppError("Email and password doesn't match", 401); 
        }
        
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string, {expiresIn: "24h"})
        return {acessToken: token, user: userReturn.parse(user)}
    }

    async register(body: TUserRegisterBody): Promise<TUserReturn>{
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const newUser = {
            name: body.name,
            email: body.email,
            password: hashedPassword,
        }

        const data = await prisma.user.create({data: newUser})
        return userReturn.parse(data)
    }

    async profile(userId: number): Promise<TUserReturn>{
        const user = await prisma.user.findFirst({where: {id: userId}})
        return userReturn.parse(user)
    }
}
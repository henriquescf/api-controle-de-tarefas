export interface IUser{
    id: number,
    name: string,
    email: string,
    password: string
}

export type TUserRegisterBody = Omit<IUser, 'id'>

export type TUserLoginBody = Pick<IUser, 'email' | 'password'>

export type TUserReturn = Omit<IUser, 'password'>

export type TLoginReturn = {
    acessToken: string
    user: TUserReturn
}
export interface ITasks{
    id: number,
    title: string,
    content: string,
    finished: boolean,
    categoryId?: number | null,
    userId: number
}  

export type TCreateTaskBody = Omit<ITasks, 'id' | "finished">

export type TUpdateTask = Omit<ITasks, 'id'>

export type TUpdateTaskBody = Partial<TUpdateTask>
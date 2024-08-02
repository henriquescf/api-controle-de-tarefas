export interface ICategories{
    id: number,
    name: string,
    userId: number
}

export type TCreateCategoryBody = Omit<ICategories, 'id'>
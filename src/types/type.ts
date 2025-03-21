import { Product } from "./product";

export interface CategoryPageTypeDef {
    data: Product[],
    category: string
}

export interface SubCategoryPageTypeDef {
    data: Product[],
    subcategory: string
}
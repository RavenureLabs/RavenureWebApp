import axios from "axios";
import { CategoryType } from "../models/category.model";
import { ProductType } from "../models/product.model";
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

export class ProductService {
    async getProducts(){
        const response = await api.post('/api/product', {
            action: 'getProducts',
            data: {}
        });
        return response.data as ProductType[];
    }
    async getProduct(id: string){
        const response = await api.post('/api/product', {
            action: 'getProduct',
            data: {
                id
            }
        });
        return response.data as ProductType;
    }
    async getProductsByCategory(category: string){
        const response = await api.post('/api/product', {
            action: 'getProductsByCategory',
            data: {
                category
            }
        });
        return response.data as ProductType[];
    }
}

export class CategoryService {
    async getCategories(){
        const response = await api.post('/api/category', {
            action: 'getCategories',
            data: {}
        });
        return response.data as CategoryType[];
    }
}
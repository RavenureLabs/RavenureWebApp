import axios from "axios";
import { CategoryType } from "../models/category.model";
import { ProductType } from "../models/product.model";
import { CommentType } from "../models/comment.model";
import { ReferanceType } from "../models/referance.model";
import { isRegistered, login, register } from "../controllers/user.controller";
import { UserType } from "../models/user.model";
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

export class ProductService {
    async getProducts(){
        const response = await api.get('/api/product');
        return response.data as ProductType[];
    }
    async getProduct(id: string){
        const response = await api.get(`/api/product/${id}`);
        return response.data as ProductType;
    }
    async getProductsByCategory(category: string){
        const response = await api.get(`/api/product/category/${category}`);
        return response.data as ProductType[];
    }
}

export class CategoryService {
    async getCategories(){
        const response = await api.get('/api/category');
        return response.data as CategoryType[];
    }
}

export class CommentService {
    async getComments(){
        const reponse = await api.get('/api/comment');
        return reponse.data as CommentType[];
    }
}
export class ReferanceService {
    async getReferances(){
        const response = await api.get('/api/referances');
        return response.data as ReferanceType[];
    }
}
export class UserService {
    async register(data: UserType){
        await register(data)
    }
    async login(data: any){
        await login(
            data
        )
    }
    async isRegistered(email: any) : Promise<boolean> {
        return isRegistered(email);
    }
}
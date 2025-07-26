import axios from "axios";
import { CategoryType } from "../models/category.model";
import { ProductType } from "../models/product.model";
import { CommentType } from "../models/comment.model";
import { ReferanceType } from "../models/referance.model";
import { UserType } from "../models/user.model";
import { getJson } from "../utils/discord/jsonViewer.util";
export const api = axios.create({
    baseURL: process.env.NEXTAUTH_URL
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
    async getCategory(id: string){
        const response = await api.get(`/api/category/${id}`);
        return response.data as CategoryType;
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

    async getUser(email: string){
        const response = await api.get(`/api/user/${email}`);
        return response.data as UserType;
    }

    async getUserByDiscordId(discordId: string){
        const response = await api.get(`/api/user/discord/${discordId}`);
        return response.data as UserType;
    }

    async getUsers(){
        const response = await api.get('/api/user');
        return response.data.users as UserType[];
    }

    async deleteUser(id: any){
        const res = await api.delete("/api/user", {
            data: {
                id: id
            }
        });
        if(res.status === 200) return true;
        return false;
    }

    async register(data: UserType) {
    try {
        const response = await api.post('/api/auth/register', data);
        return response.data;
    } catch (error: any) {
        // Axios hatalarında response.data olabilir
        if (error.response?.data) {
        return error.response.data;
        }
        // Diğer durumlar için
        return { message: error.message || 'Unknown error' };
    }
    }
    async login(data: any){
        const response = await api.post('/api/auth/login', data);
        return response.data;
    }
    async isRegistered(email: any): Promise<boolean> {
        try {
            const response = await api.get(`/api/user/check-user/${email}`);
            return true;
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                return false;
            }
            throw new Error(err.message || 'Unknown error');
        }
    }

}

export class EmbedService {
    async sendSellEmbed(productName: string, userName: string) {
        const res = await api.post("/api/discord/embed/sell-embed", { productName, userName });
        return res.data;
    }
}
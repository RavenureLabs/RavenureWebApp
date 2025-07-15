import axios from "axios";
import { CategoryType } from "../models/category.model";
import { ProductType } from "../models/product.model";
import { CommentType } from "../models/comment.model";
import { ReferanceType } from "../models/referance.model";
import { isRegistered, login, register } from "../controllers/user.controller";
import { UserType } from "../models/user.model";
import { getJson } from "../utils/discord/jsonViewer.util";
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
        const response = await api.post('/api/auth/register', data);
        return response.data;
    }
    async login(data: any){
        const response = await api.post('/api/auth/login', data);
        return response.data;
    }
    async isRegistered(email: any) : Promise<boolean> {
        const response = await api.get(`/api/user/${email}`);
        if(response.status === 404){
            return false;
        }
        return true;
    }
}

export class EmbedService {
    async sendSellEmbed(productName: string, userName: string) {
        const res = await fetch('https://discord.com/api/webhooks/1217565341522333837/BpF9IUTWI_Ir6em8IKwuvT7MqMtEblYVg1UmhcAztXe-GC3rwpz4zpzuPcJCsY31teEc',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'Discord Bot',
                embeds: [getJson('sell_embed', [{ key: 'product_name', value: productName }, { key: 'user_name', value: userName }])]
            })
        });
        if (res.status === 204) {
            console.log("Embed başarıyla gönderildi.");
            return { success: true };
        } else {
            try {
                const data = await res.json();
                return data;
            } catch (err) {
                console.error("JSON parse hatası:", err);
                return { success: false, error: "Webhook cevap döndürmedi" };
            }
        }
    }
}
import axios, { Axios } from "axios";
import { CategoryType } from "../models/category.model";
import { ProductType } from "../models/product.model";
import { CommentType } from "../models/comment.model";
import { ReferanceType } from "../models/referance.model";
import { UserType } from "../models/user.model";
import { OrderType } from "../models/order.model";
import { CartType } from "../models/cart.model";
import { UserLoginLogType } from "../models/userLog.model";
import { LicenseType } from "../types/global";
require('dotenv').config();
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
    async createProduct(data: any){
        const response = await api.post('/api/product', data);
        return response.data as ProductType;
    }
    async updateProduct(data: any){
        const response = await api.put(`/api/product`, data);
        return response.data as ProductType;
    }
    async deleteProduct(data: any){
        const response = await api.delete(`/api/product?id=${data}`);
        return response.data as ProductType;
    }
    async getMostSoldProducts(){
        const response = await api.get('/api/product/most-sold');
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
    async createCategory(data: any){
        const response = await api.post('/api/category', data);
        return response.data as CategoryType;
    }
    async updateCategory(data: any){
        const response = await api.put(`/api/category`, data);
        return response.data as CategoryType;
    }
    async deleteCategory(id: string){
        const response = await api.delete(`/api/category?id=${id}`);
        return response.data as CategoryType;
    }
}

/** @deprecated */
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
    async getReferanceById(id: string){
        const response = await api.get(`/api/referances/${id}`);
        return response.data as ReferanceType;
    }
    async createReferance(data: any){
        const response = await api.post('/api/referances', data);
        return response.data as ReferanceType;
    }
    async updateReferance(data: any){
        const response = await api.put(`/api/referances`, data);
        return response.data as ReferanceType;
    }
    async deleteReferance(id: string){
        const response = await api.delete(`/api/referances?id=${id}`);
        return response.data as ReferanceType;
    }
}
export class UserService {

    async getUser(data: string){
        const response = await api.get(`/api/user/${data}`);
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

    async updateUser(data: any){
        const response = await api.put(`/api/user`, data);
        return response.data as UserType;
    }
    
    async deleteUser(id: any){
        const res = await api.delete(`/api/user?id=${id}`);
        if(res.status === 200) return true;
        return false;
    }

    async register(data: any) {
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
        const response = await api.get(`/api/user/check-user/${email}`);
        return response.data.registeryStatus as boolean;
    }

    async resetPassword(data: any) {
        const response = await api.post('/api/user/reset-password', data);
        return response.data;
    }

}

export class EmbedService {
    async sendSellEmbed(productName: string, userName: string) {
        const res = await api.post("/api/discord/embed/sell-embed", { productName, userName });
        return res.data;
    }
}

export class OrderService {
    async createOrder(data: any){
        const response = await api.post('/api/order', data);
        return response.data as OrderType;
    }
    async getOrders(){
        const response = await api.get('/api/order');
        return response.data as OrderType[];
    }
    async getOrder(id: string){
        const response = await api.get(`/api/order/${id}`);
        return response.data as OrderType;
    }
    async updateOrder(data: any){
        const response = await api.put(`/api/order`, data);
        return response.data as OrderType;
    }
    async deleteOrder(id: string){
        const response = await api.delete(`/api/order?id=${id}`);
        return response.data as OrderType;
    }
    async getOrderCount(){
        const response = await api.get('/api/order/total-order-count');
        return response.data as number;
    }
    async getTotalExpenditure(){
        const response = await api.get('/api/order/total-expenditure');
        return response.data as number;
    }
    async getLastPurchasesExpenditure(){
        const response = await api.get('/api/order/last-purchases-expenditure');
        return response.data as number;
    }
}

export class CartService {
    async getCart(email: string){
        const response = await api.get(`/api/cart/${email}`);
        return response.data.cart as CartType;
    }
    async saveCart(data: any){
        const response = await api.post('/api/cart', data);
        return response.data.cart as CartType;
    }

}

export class UserLoginLogService {
    async insertUserLog(data: any){
        const response = await api.post('/api/log/login', data);
        return response.data as UserLoginLogType;
    }
    async getAllUserLogs(id: string){
        const response = await api.get(`/api/log/login/${id}`);
        return response.data as UserLoginLogType[];
    }
}

export class LicenseService {
    async getLicenses(id: string, email: string) {
        try {
                    const tokenResponse = await axios.get(`${process.env.NEXT_PUBLIC_LISENCE_SERVER_BASE_URI}/api/v1/public/token/${id}/${email}`);
        const token = tokenResponse.data.token;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_LISENCE_SERVER_BASE_URI}/api/v1/public/get`,
            {
                "token": token,
                "DiscordID": id,
                "email": email
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data as LicenseType[];
        }catch (error) {
            console.error("Error fetching licenses:", error);
            return [] as LicenseType[];
        }
    }
}
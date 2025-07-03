import mongoose from "mongoose";
import { CategoryType } from "./category.model";
export type ProductType = {
    id: string;
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    imageUrl: string;
    author: string;
    reviews: {
        rating: number;
        count: number;
    }
    category: string;
    salesCount: number;
    createdAt: string;
    updatedAt?: string;
    stock?: number;
    isFeatured?: boolean;
    isActive?: boolean;
} 

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    imageUrl: { type: String, required: true },
    author: { type: String, required: true },
    reviews: {
        rating: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    salesCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
});

const Product = mongoose.models.Product || mongoose.model<ProductType & mongoose.Document>('Product', productSchema);
export default Product;
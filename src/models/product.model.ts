import mongoose, { ObjectId } from "mongoose";
import { CategoryType } from "./category.model";
import { MultiLangText } from "../types/global";


export type ProductType = {
    _id: ObjectId;
    name: MultiLangText;
    description?: MultiLangText;
    price: number;
    discountPrice?: number;
    imageUrl: string;
    author: string;
    reviews?: {
        rating: number;
        count: number;
    }
    category: ObjectId;
    salesCount?: number;
    createdAt: string;
    updatedAt?: string;
    stock?: number;
    isFeatured?: boolean;
    isActive?: boolean;
} 

const productSchema = new mongoose.Schema({
    name: { type: Object, required: true },
    description: { type: Object, default: null },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    imageUrl: { type: String, required: true },
    author: { type: String, required: true },
    reviews: {
        rating: { type: Number, default: 0, required: false },
        count: { type: Number, default: 0, required: false }
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    salesCount: { type: Number, default: 0, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

const Product = mongoose.models.Product || mongoose.model<ProductType & mongoose.Document>('Product', productSchema);
export default Product;
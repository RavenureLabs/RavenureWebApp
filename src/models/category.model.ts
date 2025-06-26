import { ProductType } from "./product.model";

import mongoose from "mongoose";
export type CategoryType = {
    name: string;
    products: ProductType[];
    createdAt: string;
    updatedAt?: string;
    isActive?: boolean;
};

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});
const Category = mongoose.models.Category || mongoose.model<CategoryType & mongoose.Document>('Category', categorySchema);
export default Category;
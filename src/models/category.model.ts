import { MultiLangText } from "../types/global";
import { ProductType } from "./product.model";

import mongoose, { ObjectId } from "mongoose";
export type CategoryType = {
    _id: ObjectId;
    name: MultiLangText;
    products: ProductType[];
    createdAt: string;
    updatedAt?: string;
    isActive?: boolean;
};

const categorySchema = new mongoose.Schema({
    name: { type: Object, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    isActive: { type: Boolean, default: true }
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});
const Category = mongoose.models.Category || mongoose.model<CategoryType & mongoose.Document>('Category', categorySchema);
export default Category;
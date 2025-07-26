import mongoose, { ObjectId } from "mongoose";

export type CartType = {
    _id: ObjectId;
    userId: string;
    items: {
        productId: string;
        quantity: number;
    }
}
export const CartSchema = new mongoose.Schema<CartType>({
    userId: { type: String, required: true },
    items: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 }
    }]
}, {
    timestamps: true,
});

export default mongoose.models.Cart || mongoose.model<CartType>('Cart', CartSchema);
import mongoose, { ObjectId } from "mongoose";

export type CartType = {
    _id: ObjectId;
    userId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
const CartSchema = new mongoose.Schema<CartType>({
    userId: { type: String, required: true },
    items: [{
        productId: { type: String, required: true, ref: 'Product' },
        quantity: { type: Number, required: true, default: 1 }
    }]
}, {
    timestamps: true,
});

const Cart = mongoose.models.Cart || mongoose.model<CartType>('Cart', CartSchema);
export default Cart;
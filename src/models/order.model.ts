import mongoose from "mongoose";

export type OrderType = {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    productIds: mongoose.Types.ObjectId[];
    price: number;
    quantity: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
};

export const Order = new mongoose.Schema<OrderType>({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        }],
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<OrderType>('Order', Order);
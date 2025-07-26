import mongoose, { Schema } from "mongoose";

export type ReferanceType = {
    _id?: mongoose.Types.ObjectId;
    name: string;
    url?: string;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const referanceSchema = new Schema<ReferanceType>({
    name: { type: String, required: true },
    url: { type: String },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export default (mongoose.models.Referance || mongoose.model<ReferanceType>('Referance', referanceSchema));

import mongoose, { ObjectId } from "mongoose";
export type UserType = {
    _id: ObjectId;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt?: string;
    products: ObjectId[];
    profilePictureUrl?: string;
    accountType: 'discord' | 'email';
    phoneNumber?: string;
    discordId?: string;
    isActive?: boolean;
    isVerified?: boolean;
    lastLogin?: string;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    profilePictureUrl: { type: String, default: null },
    accountType: { type: String, enum: ['discord', 'email'], required: true },
    phoneNumber: { type: String, required: false, default: null },
    discordId: { type: String, required: false, default: null },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null }
});
const User = mongoose.models.User || mongoose.model<UserType & mongoose.Document>('User', userSchema);
export default User;
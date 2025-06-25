import mongoose from "mongoose";
export type User = {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt?: string;
    profilePictureUrl?: string;
    accountType: 'discord' | 'google' | 'email';
    isActive?: boolean;
    isVerified?: boolean;
    lastLogin?: string;

}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    profilePictureUrl: { type: String, default: null },
    accountType: { type: String, enum: ['discord', 'google', 'email'], required: true },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null }
});
const User = mongoose.model<User & mongoose.Document>('User', userSchema);
export default User;
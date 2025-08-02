import { NextResponse } from "next/server";
import { connectToDatabase } from "../lib/database";
import Cart from "../models/cart.model";
import { getUserByEmail } from "./user.controller";
import User from "../models/user.model";

export async function getUserCart(email: string) {
    await connectToDatabase();
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        const cart = await Cart.findOne({ userId: user._id }).populate('items.productId');
        if (!cart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 }); 
        }
        return NextResponse.json({ success: "Cart fetched successfully", cart }, { status: 200 }); 
    } catch (error) {
        console.error("Error fetching cart:", error);
        return NextResponse.json({ message: "Error fetching cart", error }, { status: 500 }); 
    }
}

export async function deleteCart(userId: string) { 
    await connectToDatabase();
    try {
        const cart = await Cart.findOneAndDelete({ userId });
        return NextResponse.json({ success: "Cart deleted successfully", cart }, { status: 200 }); 
    } catch (error) {
        console.error("Error deleting cart:", error);
        return NextResponse.json({ message: "Error deleting cart", error }, { status: 500 }); 
    }
}

export async function updateOrCreate(userId: string, cartData: any) {
    await connectToDatabase();
    try {
        
        const allowedFields = {
            items: cartData.items,
        };
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $set: allowedFields },
            { new: true, upsert: true }
        );
        return NextResponse.json({ success: "Cart updated successfully", cart }, { status: 200 }); 
    } catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json({ message: "Error updating cart", error }, { status: 500 }); 
    }
}
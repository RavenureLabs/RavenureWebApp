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
        
        const cart = await Cart.findOne({ userId: user._id.toString() }).populate({
            path: 'items.productId',
            model: 'Product',
        });
        if (!cart) {
            // create a new empty cart if one doesn't exist
            await Cart.create({ userId: user._id.toString(), items: [] });
            const newCart = await Cart.findOne({ userId: user._id.toString() }).populate(
                {
                    path: 'items.productId',
                    model: 'Product',
                }
            );
            return NextResponse.json({ success: "Cart created successfully", cart: newCart }, { status: 200 });
        }
        return NextResponse.json({ success: "Cart fetched successfully", cart }, { status: 200 }); 
    } catch (error) {
        console.error("Error fetching cart:", error);
        return NextResponse.json({ message: "Error fetching cart", error }, { status: 500 }); 
    }
}

export async function deleteCart(email: string) { 
    await connectToDatabase();
    try {
        if (!email) {
            return NextResponse.json({ message: "Missing ID" }, { status: 400 });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const cart = await Cart.findOneAndDelete({ userId: user._id.toString() });
        if (!cart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }
        return NextResponse.json({ success: "Cart deleted successfully", cart }, { status: 200 }); 
    } catch (error) {
        console.error("Error deleting cart:", error);
        return NextResponse.json({ message: "Error deleting cart", error }, { status: 500 }); 
    }
}

export async function updateOrCreate(email: string, cartData: any) {
    await connectToDatabase();
    try {
        const user = await User.findOne({ email });
        const allowedFields = {
            items: cartData.items,
        };
        const cart = await Cart.findOneAndUpdate(
            {  userId: user._id.toString() },
            { $set: allowedFields },
            { new: true, upsert: true }
        );
        return NextResponse.json({ success: "Cart updated successfully", cart }, { status: 200 }); 
    } catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json({ message: "Error updating cart", error }, { status: 500 }); 
    }
}
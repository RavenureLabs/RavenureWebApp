import { NextResponse } from "next/server";
import { connectToDatabase } from "../lib/database";
import Product from "../models/product.model";
import  Order from "../models/order.model";

export const getOrders = async () => {
    await connectToDatabase();
    try {
        const orders = await Order.find().populate("productId");
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ message: "Error fetching orders", error }, { status: 500 });
    }
};

export const getOrderById = async (id: string) => {
    await connectToDatabase();
    try {
        const order = await Order.findById(id).populate("productId");
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json({ message: "Error fetching order", error }, { status: 500 });
    }
};

export const createOrder = async (orderData: any) => {
    await connectToDatabase();
    try {
        const order = await Order.create(orderData);
        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ message: "Error creating order", error }, { status: 500 });
    }
};

export const updateOrder = async (id: string, orderData: any) => {
    await connectToDatabase();
    try {
        const order = await Order.findByIdAndUpdate(id, orderData, { new: true }).populate("productId");
        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ message: "Error updating order", error }, { status: 500 });
    }
};

export const deleteOrder = async (id: string) => {
    await connectToDatabase();
    try {
        await Order.findByIdAndDelete(id);
        return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json({ message: "Error deleting order", error }, { status: 500 });
    }
};
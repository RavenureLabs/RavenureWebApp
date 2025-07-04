import { NextResponse } from "next/server";
import { connectToDatabase } from "../lib/database";
import Product from "../models/product.model";

export async function getProducts(data: any) {
    await connectToDatabase();
    try{
        const products = await Product.find();
        return NextResponse.json(products.map(product => {
            return convertToDto(product);
        }), { status: 200 });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ message: "Error fetching products", error }, { status: 500 });
    }
}

export async function getProductById(data: any) {
    await connectToDatabase();
    try{
        const product = await Product.findById(data.id);
        return NextResponse.json(convertToDto(product), { status: 200 });
    }
    catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ message: "Error fetching product", error }, { status: 500 });
    }
}

export async function getProductsByCategory(data: any) {
    await connectToDatabase();
    try{
        const products = await Product.find().populate({
                                    path: 'category',
                                    match: { name: data.category }
                                    });
        return NextResponse.json(products.map(product => {
            return convertToDto(product);
        }), { status: 200 });
    }
    catch (error) {
        console.error("Error fetching products by category:", error);
        return NextResponse.json({ message: "Error fetching products by category", error }, { status: 500 });
    }
}

export async function createProduct(data: any) {
    await connectToDatabase();
    try{
        const product = await Product.create(data);
        return NextResponse.json(convertToDto(product), { status: 200 });
    }
    catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ message: "Error creating product", error }, { status: 500 });
    }
}

export async function updateProduct(data: any) {
    await connectToDatabase();
    try{
        const product = await Product.findByIdAndUpdate(data.id, data, { new: true });
        return NextResponse.json(convertToDto(product), { status: 200 });
    }
    catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ message: "Error updating product", error }, { status: 500 });
    }
}

export async function deleteProduct(data: any) {
    await connectToDatabase();
    try{
        const product = await Product.findByIdAndDelete(data.id);
        return NextResponse.json(convertToDto(product)), { status: 200 };
    }
    catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ message: "Error deleting product", error }, { status: 500 });
    }
}

const convertToDto = (product: any) => {
    return {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        discountPrice: product.discountPrice,
        imageUrl: product.imageUrl,
        author: product.author,
        reviews: product.reviews,
        category: product.category,
        salesCount: product.salesCount,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        stock: product.stock,
        isFeatured: product.isFeatured,
        isActive: product.isActive
    };
};
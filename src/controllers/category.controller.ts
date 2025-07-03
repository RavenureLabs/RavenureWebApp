import { NextResponse } from "next/server";
import { connectToDatabase } from "../lib/database";
import Category from "../models/category.model";

export async function getCategories(data: any) {
    await connectToDatabase();
    try{
        const categories = await Category.find();
        console.log(categories)
        return NextResponse.json(categories.map(category => {
            return convertToDto(category);
        }), { status: 200 });
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ message: "Error fetching categories", error }, { status: 500 });
    }
}

export async function getCategoryById(data: any) {
    await connectToDatabase();
    try{
        const category = await Category.findById(data.id);
        return NextResponse.json(convertToDto(category), { status: 200 });
    }
    catch (error) {
        console.error("Error fetching category:", error);
        return NextResponse.json({ message: "Error fetching category", error }, { status: 500 });
    }
}
export async function createCategory(data: any) {
    await connectToDatabase();
    try{
        const category = await Category.create(data);
        return NextResponse.json(convertToDto(category), { status: 200 });
    }
    catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ message: "Error creating category", error }, { status: 500 });
    }
}
export async function updateCategory(data: any) {
    await connectToDatabase();
    try{
        const category = await Category.findByIdAndUpdate(data.id, data, { new: true });
        return NextResponse.json(convertToDto(category), { status: 200 });
    }
    catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ message: "Error updating category", error }, { status: 500 });
    }
}
export async function deleteCategory(data: any) {
    await connectToDatabase();
    try{
        const category = await Category.findByIdAndDelete(data.id);
        return NextResponse.json(convertToDto(category), { status: 200 });
    }
    catch (
        error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ message: "Error deleting category", error }, { status: 500 });
    }
}

const  convertToDto = (category: any) => {
    return {
        id: category._id,
        name: category.name,
        products: category.products,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        isActive: category.isActive,
    };
};
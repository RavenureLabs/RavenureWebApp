import { NextResponse } from "next/server";
import { connectToDatabase } from "../lib/database";
import Category, { CategoryType } from "../models/category.model";
import { translate } from "../utils/translate.utils";
import Product from "../models/product.model";

export async function getCategories() {
    await connectToDatabase();
    try{
        const categories = await Category.find();
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
        const category = await Category.findById(data);
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
        console.log("Creating category with data:", data);
        const { name } = data;
        const translated = await translate(name);
        data.name = translated;
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
        await Category.findByIdAndDelete(data);
        // delete the products associated with the category
        await Product.deleteMany({ category: data });
        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    }
    catch (
        error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ message: "Error deleting category", error }, { status: 500 });
    }
}

const  convertToDto = (category: CategoryType) => {
    return {
        _id: category._id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        isActive: category.isActive,
    };
};
// user controller.ts
import { NextResponse } from "next/server";
import User from "../models/user.model";
import { connectToDatabase } from "../lib/database";
export async function createUser(data: any) {
    await connectToDatabase();
    try{
        const newUser = new User({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role || 'user',
            profilePictureUrl: data.profilePictureUrl || null,
            accountType: data.accountType || 'email',
            isActive: data.isActive || true,
            isVerified: data.isVerified || false,
        });

        const savedUser = await newUser.save();
        return NextResponse.json({ message: "User created successfully", user: savedUser }, { status: 201 });
        
    }
    catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
    }
}

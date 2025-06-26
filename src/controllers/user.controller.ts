// user controller.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "../lib/database";
import User from "../models/user.model";

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
        return NextResponse.json({ message: "User created successfully", user: convertToDto(savedUser) }, { status: 201 });
        
    }
    catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
    }
}
export async function updateUser(id: string, data: any) {
    await connectToDatabase();
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role || 'user',
            profilePictureUrl: data.profilePictureUrl || null,
            accountType: data.accountType || 'email',
            isActive: data.isActive || true,
            isVerified: data.isVerified || false,
        }, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User updated successfully", user: convertToDto(updateUser) }, { status: 200 });
    }catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Error updating user", error }, { status: 500 });
    }
}

export async function getUserById(id: string) {
    await connectToDatabase();
    try {
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user: convertToDto(user) }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "Error fetching user", error }, { status: 500 });
    }
}

export async function getUserByName(name: string) {
    await connectToDatabase();
    try {
        const user = await User.findOne({ name: new RegExp(name, 'i') }); // Case-insensitive search
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ users: convertToDto(user) }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user by name:", error);
        return NextResponse.json({ message: "Error fetching user by name", error }, { status: 500 });
    }
}

export async function login(data: { name: string, password: string }) {
    await connectToDatabase();
    try {
        const user = await User.findOne({ name: data.name });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (user.password !== data.password) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }
        user.lastLogin = new Date().toISOString(); // Update last login time
        user.isActive = true; // Set user as active on login
        await user.save();
        return NextResponse.json({ message: "Login successful", user: convertToDto(user)
        }, { status: 200 });
    } catch (error) {
        console.error("Error logging in user:", error);
        return NextResponse.json({ message: "Error logging in user", error }, { status: 500 });
    }
}

export async function getAllUsers() {
    await connectToDatabase();
    try {
        const users = await User.find({});
        return NextResponse.json({ users: users.map(convertToDto) }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
    }
}



const convertToDto = (user: any) => {
    user.password = undefined; // Remove password from the response
    user.__v = undefined; // Remove version key from the response
    user._id = undefined; // Remove MongoDB ID from the response
    return user;
}
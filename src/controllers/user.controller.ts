// user controller.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "../lib/database";
import User, { UserType } from "../models/user.model";

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
export async function updateUser(data: any) {
    await connectToDatabase();
    try {
        const { id } = data.id;
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
        const updateUser = await updatedUser.save();
        if (!updateUser) {
            return NextResponse.json({ message: "Error updating user" }, { status: 500 });
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

export async function deleteUser(id: string) {
    await connectToDatabase();
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Error deleting user", error }, { status: 500 });
    }
}

export async function login(data: { email: string, password: string }) {
    await connectToDatabase();
    try {
        console.log("Login request received:", data);
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (user.password !== data.password) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }
        if (!user.isActive) {
            return NextResponse.json({ message: "User is not active" }, { status: 403 });
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

export async function register(data: {
  name: string,
  email: string,
  password?: string,          // OAuth için password zorunlu değil
  discordId?: string,         // Discord OAuth için
  role?: string,
  profilePictureUrl?: string,
  accountType?: string,
  isActive?: boolean,
  isVerified?: boolean,
}) {
  await connectToDatabase();

  try {
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password || null,     // OAuth kullanıcıda null olabilir
      discordId: data.discordId || null,   // Discord ID'si varsa ekle
      role: data.role || 'user',
      profilePictureUrl: data.profilePictureUrl || null,
      accountType: data.accountType || 'email',  // "email" veya "discord"
      isActive: data.isActive ?? true,
      isVerified: data.isVerified ?? false,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User registered successfully",
      user: convertToDto(savedUser)
    }, { status: 201 });

  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "Error registering user", error }, { status: 500 });
  }
}


const convertToDto = (user: UserType) => {
    return {
        name: user.name,
        email: user.email,
        role: user.role,
        profilePictureUrl: user.profilePictureUrl,
        accountType: user.accountType,
        isActive: user.isActive,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
    };
}
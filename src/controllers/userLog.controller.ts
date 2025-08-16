import { NextResponse } from "next/server";
import { connectToDatabase } from "../lib/database";
import userLogModel from "../models/userLog.model";
import User from "../models/user.model";

export async function getAllUserLogs(email: string) {
    await connectToDatabase();
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const userLogs = await userLogModel.find({ userId: user._id.toString() });
        return NextResponse.json(userLogs, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching user logs:", error);
        return NextResponse.json({ message: "Error fetching user logs", error }, { status: 500 });
    }
}

export async function insertUserLog(data: any) {
    await connectToDatabase();
    try{
        const userLog = await userLogModel.create(data);
        return NextResponse.json(userLog, { status: 200 });
    }
    catch (error) {
        console.error("Error inserting user log:", error);
        return NextResponse.json({ message: "Error inserting user log", error }, { status: 500 });
    }
}
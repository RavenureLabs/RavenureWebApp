import { Settings } from "lucide-react";
import { connectToDatabase } from "../lib/database";
import SettingsModel from "../models/settings.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// if user is admin = 2, user = 1, guest = 0
export async function getSettings(permissionStatus: number) {
    await connectToDatabase();
    try {
        const settings = await SettingsModel.findOne();
        if(!settings){
            // create
            const newSettings = new SettingsModel({
                title: "title",
                smtp: {
                    host: "example@example.com",
                    port: 587,
                    secure: false
                },
                payment: {
                    active: "paytr",
                    paytr: {
                        merchantId: "your_merchant_id"
                    }
                },
                kdv: 0
            });
            await newSettings.save();
            return NextResponse.json(filtredData(newSettings, permissionStatus), { status: 200 });
        }
        return NextResponse.json(filtredData(settings, permissionStatus), { status: 200 });
    }    
    catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ message: "Error fetching settings", error }, { status: 500 });
    }
}


export async function updateSettings(data: any) {
    await connectToDatabase();
    try {
        const settings = await SettingsModel.findOneAndUpdate({}, data, { new: true });
        return NextResponse.json(filtredData(settings, 2), { status: 200 });
    }    
    catch (error) {
        console.error("Error updating settings:", error);
        return NextResponse.json({ message: "Error updating settings", error }, { status: 500 });
    }
}

const filtredData = (data: any, permissionStatus: number) => {
    if (permissionStatus === 2) {
        return data; 
    } else {
        return {
            title: data.title
        };
    }
};

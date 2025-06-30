import {NextResponse} from "next/server";
import {connectToDatabase} from "../lib/database";
import Referance from "@/src/models/referance.model";
export async function getReferances(data: any) {
    await connectToDatabase();
    try{
        const referances = await Referance.find();
        return NextResponse.json(referances.map(referance => {
            return convertToDto(referance);
        }), { status: 200 });
    }
    catch (error) {
        console.error("Error fetching referances:", error);
        return NextResponse.json({ message: "Error fetching referances", error }, { status: 500 });
    }
}
export async function getReferanceById(data: any) {
    await connectToDatabase();
    try{
        const referance = await Referance.findById(data.id);
        return NextResponse.json(convertToDto(referance), { status: 200 });
    }
    catch (error) {
        console.error("Error fetching referance:", error);
        return NextResponse.json({ message: "Error fetching referance", error }, { status: 500 });
    }
}
export async function createReferance(data: any) {
    await connectToDatabase();
    try{
        const referance = await Referance.create(data);
        return NextResponse.json(convertToDto(referance), { status: 200 });
    }
    catch (error) {
        console.error("Error creating referance:", error);
        return NextResponse.json({ message: "Error creating referance", error }, { status: 500 });
    }
}
export async function updateReferance(data: any) {
    await connectToDatabase();
    try{
        const referance = await Referance.findByIdAndUpdate(data.id, data, { new: true });
        return NextResponse.json(convertToDto(referance), { status: 200 });
    }
    catch (error) {
        console.error("Error updating referance:", error);
        return NextResponse.json({ message: "Error updating referance", error }, { status: 500 });
    }
}
export async function deleteReferance(data: any) {
    await connectToDatabase();
    try{
        const referance = await Referance.findByIdAndDelete(data.id);
        return NextResponse.json(convertToDto(referance), { status: 200 });
    }
    catch (error) {
        console.error("Error deleting referance:", error);
        return NextResponse.json({ message: "Error deleting referance", error }, { status: 500 });
    }
}

const convertToDto = (referance: any) => {
    return {
        id: referance._id,
        name: referance.name,
        url: referance.url,
        imageUrl: referance.imageUrl,
        createdAt: referance.createdAt,
        updatedAt: referance.updatedAt,
    };
};
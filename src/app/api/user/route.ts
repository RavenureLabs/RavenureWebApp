import { createUser, deleteUser, getAllUsers, getUserById, getUserByName, login, register, updateUser } from "@/src/controllers/user.controller";

import { requireAuth } from "@/src/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const auth = await requireAuth(request, ['admin']);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return getAllUsers();
}
export async function PUT(request: NextRequest) {
    const  data  = await request.json();
    const auth = await requireAuth(request, ['user', 'admin']);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return updateUser(data);
}
export async function DELETE(request: NextRequest) {
    const auth = await requireAuth(request, ['admin']);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return deleteUser(id);
}
export async function POST(request: NextRequest) {
    const { data } = await request.json();
    const auth = await requireAuth(request, ['admin']);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return createUser(data);
}
/*export async function POST(request: NextRequest) {
    const body = await request.json();
    const { action, data } = body;
    switch (action) {
        case 'createUser':
            const auth = await requireAuth(request, ['admin']);
            if (auth instanceof NextResponse) {
                return auth;
            }
            const user = auth.user;
            if (user.role !== 'admin') {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            return createUser(data);
        case 'updateUser':
            const authUpdate = await requireAuth(request, ['user', 'admin']);
            if (authUpdate instanceof NextResponse) {
                return authUpdate;
            }
            const userUpdate = authUpdate.user;
            if (userUpdate.role !== 'admin' && userUpdate.id !== data.id) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            return updateUser(data.id, data);
        case 'getUserById':
            const authGetById = await requireAuth(request, ['user', 'admin']);
            if (authGetById instanceof NextResponse) {
                return authGetById;
            }
            const userGetById = authGetById.user;
            if (userGetById.role !== 'admin' && userGetById.id !== data.id) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            return getUserById(data.id);
        case 'getUserByName':
            const authGetByName = await requireAuth(request, ['user', 'admin']);
            if (authGetByName instanceof NextResponse) {
                return authGetByName;
            }
            

            const userGetByName = authGetByName.user;
            if (userGetByName.role !== 'admin' && userGetByName.name !== data.name) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            
            return getUserByName(data.name);
        case 'getAllUsers':
            const authGetAll = await requireAuth(request, ['admin']);
            if (authGetAll instanceof NextResponse) {
                return authGetAll;
            }
            const userGetAll = authGetAll.user;
            if (userGetAll.role !== 'admin') {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            return getAllUsers();
        case 'login':
            return login(data);
        case 'register':
            return register(data); 
        default:
            return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
}*/
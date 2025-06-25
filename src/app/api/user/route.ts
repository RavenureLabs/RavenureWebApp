import { createUser } from "@/src/controllers/user.controller";
export async function GET(request: Request) {
    const body = await request.json();
    const { action, data } = body;
    switch (action) {

    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const { action, data } = body;
    switch (action) {
        case 'createUser':
            return createUser(data);
        default:
    }
}
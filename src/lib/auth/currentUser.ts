// lib/auth/currentUser.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/options";
import User, { UserType } from "@/src/models/user.model";
import { connectToDatabase } from "../database";

export async function currentUser(select?: Record<string, 1 | 0>): Promise<UserType | null> {
    const session = await getServerSession(authOptions);
    const dbId = (session as any)?.user?.dbId;
    if (!dbId) return null;
    await connectToDatabase();
    const projection = select ?? { name: 1, email: 1, role: 1, profilePictureUrl: 1 };
    const user = await User.findById(dbId, projection).lean();
    if (!user) return null;
    return user as unknown as UserType;
}

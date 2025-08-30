import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserType } from "@/src/models/user.model";

export async function requireAuth(
  req: NextRequest,
  allowedRoles: string[] = []
): Promise<{ user?: any } | NextResponse> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = token.user;
  if (allowedRoles.length > 0 && (!user || !user.role || !allowedRoles.includes(user.role))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return { user: user };
}

// app/api/log/login/[email]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth/options"; 
import { getAllUserLogs } from "@/src/controllers/userLog.controller";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params;
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user.email != email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getAllUserLogs(email);
  return NextResponse.json(await data.json(), { status: 200 });
}

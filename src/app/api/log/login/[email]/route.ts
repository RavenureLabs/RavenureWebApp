// app/api/log/login/[email]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllUserLogs } from "@/src/controllers/userLog.controller";
import { currentUser } from "@/src/lib/auth/currentUser";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params;
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.email != email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getAllUserLogs(email);
  return NextResponse.json(await data.json(), { status: 200 });
}

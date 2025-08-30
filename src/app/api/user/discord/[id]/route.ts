import { getUserByDiscordId } from "@/src/controllers/user.controller";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return getUserByDiscordId(id);
}
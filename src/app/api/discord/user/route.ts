// app/api/discord/me/route.ts
import DiscordBot from "@/src/lib/discord/discord.lib";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/src/lib/auth/options";
import { currentUser } from "@/src/lib/auth/currentUser";

export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const discordId = user.discordId;
  if (!discordId) {
    return NextResponse.json({ error: "No Discord ID on session" }, { status: 400 });
  }

  const guildId = process.env.DISCORD_GUILD_ID;
  if (!guildId) {
    return NextResponse.json({ error: "Missing guild ID" }, { status: 500 });
  }

  const client = await DiscordBot.getClient(); 

  try {
    const guild = await client.guilds.fetch(guildId);
    const member = await guild.members.fetch({ user: discordId, force: true });

    return NextResponse.json(
      {
        username: member.displayName,
        avatar: member.user.displayAvatarURL(), 
        id: member.id,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "User not found or fetch failed",
        details: err?.message ?? String(err),
        guildId,
        discordId,
      },
      { status: 404 }
    );
  }
}

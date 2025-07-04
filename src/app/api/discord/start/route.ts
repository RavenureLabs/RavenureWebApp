import  DiscordBot  from "@/src/lib/discord/discord.lib";

export async function GET(request: Request) {
    const client = await DiscordBot.getClient();
    return new Response(JSON.stringify({ message: "Discord bot başlatıldı" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
import { getJson } from "@/src/utils/discord/jsonViewer.util";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { productName, userName } = await request.json();
    const json = getJson('sell_embed', [{ key: 'product_name', value: productName }, { key: 'user_name', value: userName }])
    const res = await fetch('https://discord.com/api/webhooks/1217565341522333837/BpF9IUTWI_Ir6em8IKwuvT7MqMtEblYVg1UmhcAztXe-GC3rwpz4zpzuPcJCsY31teEc',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'Ravenure',
            embeds: [json]
        })
    });
    return NextResponse.json({ message : 'success' });
}
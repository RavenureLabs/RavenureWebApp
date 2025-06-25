import * as deepl from "deepl-node";

const authKey = process.env.DEEPL_AUTH_KEY;
if (!authKey) {
    throw new Error("DEEP_AUTH_KEY is not set in environment variables");
}
const translator = new deepl.Translator(authKey);

export async function POST(request: Request) {
    try {
        const { text, targetLanguage } = await request.json();

        if (!text || !targetLanguage) {
            return new Response("Missing text or target language", { status: 400 });
        }
        const result = await translator.translateText(text, null, targetLanguage);
        if (!result) {
            return new Response("Translation failed", { status: 500 });
        }
        // @ts-ignore
        return new Response(JSON.stringify({ status: "success", translatedText: result.text}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    catch (error) {
        console.error("Translation error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
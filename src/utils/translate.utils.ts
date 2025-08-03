import * as deepl from "deepl-node";
import { ProductType } from "../models/product.model";
import { MultiLangText } from "../types/global";

const authKey = process.env.DEEPL_AUTH_KEY;
if (!authKey) {
    throw new Error("DEEPL_AUTH_KEY is not set in environment variables");
}

const languages = ['en', 'tr'] as const;
type Lang = typeof languages[number];

const languageCodes: Record<Lang, deepl.TargetLanguageCode> = {
    en: "en-US",
    tr: "tr",
};

const translator = new deepl.Translator(authKey);

export async function translate(data: string): Promise<MultiLangText> {
    const translations: MultiLangText = {};
    for (const lang of languages) {
        const target = languageCodes[lang];
        console.log(`Translating to ${lang} (${target})`);
        const result = await translator.translateText(data, null, target);
        translations[lang] = result.text;
    }
    return translations;
}

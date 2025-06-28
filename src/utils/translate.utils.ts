import * as deepl from "deepl-node";
import { ProductType } from "../models/product.model";

import fs from "fs";
import path from "path";

const authKey = process.env.DEEPL_AUTH_KEY;
if (!authKey) {
    throw new Error("DEEP_AUTH_KEY is not set in environment variables");
}

const languages = ['en', 'tr'];

const translator = new deepl.Translator(authKey);
export async function appendProductTranslatetion(product: ProductType, targetLanguage: any) {
    const {category, description} = await translateProduct(product, targetLanguage);
    languages.forEach(lang => {
        const langJson = readLocaleJson(lang);
        langJson[product.id] = { category, description };
        writeLocaleJson(lang, langJson);
    })
}

async function translateProduct(product: ProductType, targetLanguage: any) {
    const category = await translator.translateText(product.category.name, null, targetLanguage);
    const description = await translator.translateText(product.description as string, null, targetLanguage);
    return {
        category: category,
        description: description
    }
}

function readLocaleJson(lang: string) {
  const filePath = path.resolve(__dirname, `../public/locales/${lang}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeLocaleJson(lang: string, data: any) {
  const filePath = path.resolve(__dirname, `../public/locales/${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
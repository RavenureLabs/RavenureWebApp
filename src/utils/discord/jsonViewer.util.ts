import fs from 'fs';
import path from 'path';

const basePath = "./src/config/embeds";

export type JsonPlaceHolder = {
    key: string;
    value: any;
};

function replacePlaceholders(obj: any, placeholders: JsonPlaceHolder[]): any {
    if (Array.isArray(obj)) {
        return obj.map(item => replacePlaceholders(item, placeholders));
    } else if (typeof obj === 'object' && obj !== null) {
        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = replacePlaceholders(value, placeholders);
        }
        return result;
    } else if (typeof obj === 'string') {
            return obj.replace(/{\s*(.*?)\s*}/g, (_, key) => {
                const found = placeholders.find(p => p.key === key);
                return found ? String(found.value) : `{${key}}`;
            });
    }
    return obj;
}

export const getJson = (name: string, jsonWrappers: JsonPlaceHolder[]) => {
    const res = fs.readFileSync(path.join(basePath, `${name}.json`), 'utf-8');
    const json = JSON.parse(res);
    const replacedJson = replacePlaceholders(json, jsonWrappers);
    return replacedJson;
};

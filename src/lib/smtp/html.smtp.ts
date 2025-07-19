import fs from "fs";
import path from "path";

export type MailPlaceHolder = { key: string; value: string };

export const getHTML = (htmlWrappers: MailPlaceHolder[]) => {
    let htmlText = readHtmlFile();
    htmlWrappers.forEach((wrapper) => {
        htmlText = htmlText.replaceAll(`{${wrapper.key}}`, wrapper.value);
    });
    return htmlText;
}


const readHtmlFile = () => {
    return `
    <p>{code}, Bu sizin kayıt kodunuz!</p>
    `
}
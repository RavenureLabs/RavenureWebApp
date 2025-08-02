import { NextRequest } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());

    const {
        merchant_oid,
        status,
        total_amount,
        hash,
    } = data as Record<string, string>;

    const key = process.env.PAYTR_MERCHANT_KEY!;
    const salt = process.env.PAYTR_MERCHANT_SALT!;

    const hashStr = merchant_oid + salt + status + total_amount;
    const token = crypto.createHmac('sha256', key).update(hashStr).digest('base64');

    if (token !== hash) {
        return new Response("PAYTR notification failed: Invalid hash", { status: 403 });
    }

    if (status === "success") {
        console.log("Ödeme BAŞARILI:", merchant_oid);
    } else {
        console.log("Ödeme BAŞARISIZ:", merchant_oid);
    }

    return new Response("OK");
}

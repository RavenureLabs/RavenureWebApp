import { NextRequest } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    merchant_id,
    user_ip,
    merchant_oid,
    email,
    payment_amount,
    user_basket,
    no_installment,
    max_installment,
    currency,
    test_mode,
    merchant_salt
  } = body;

  const merchant_key = process.env.PAYTR_MERCHANT_KEY!;
  const concatStr = merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket + no_installment + max_installment + currency + test_mode + merchant_salt;

  const token = crypto
    .createHmac('sha256', merchant_key)
    .update(concatStr)
    .digest('base64');

  return Response.json({ paytr_token: token });
}

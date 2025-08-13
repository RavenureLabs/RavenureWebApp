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
    payment_type,
    installment_count,
    currency,
    test_mode,
    non_3d
  } = body;


    var hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${payment_type}${installment_count}${currency}${test_mode}${non_3d}`;
    console.log('HASH STR' + hashSTR);
    var paytr_token = hashSTR + process.env.PAYTR_MERCHANT_SALT!;
    console.log('PAYTR TOKEN' + paytr_token);
    var token = crypto.createHmac('sha256', process.env.PAYTR_MERCHANT_KEY!).update(paytr_token).digest('base64');

  return Response.json({ token });
}

import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { Settings } from '@/src/models/settings.model';
import { getSettings } from '@/src/controllers/settings.controller';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const settings: Settings = await (await getSettings(2)).json();
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

  const merchant_key = settings.payment.paytr.merchantKey;
  const concatStr = merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket + no_installment + max_installment + currency + test_mode + merchant_salt;

  const token = crypto
    .createHmac('sha256', merchant_key)
    .update(concatStr)
    .digest('base64');

  return Response.json({ paytr_token: token });
}

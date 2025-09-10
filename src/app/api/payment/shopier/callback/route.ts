import { NextRequest, NextResponse } from 'next/server';
import { getShopier } from '@/src/lib/shopier';

export const runtime = 'nodejs'; 

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const body: Record<string, any> = {};
  for (const [k, v] of form.entries()) body[k] = v;

  const shopier = getShopier();

  const result = shopier.callback(body); 

  if (result && typeof result === 'object' && 'success' in result && result.success) {
    
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false });
}

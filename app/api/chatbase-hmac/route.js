import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const secret = process.env.CHATBASE_SECRET;
    const hash = crypto.createHmac('sha256', secret).update(userId).digest('hex');

    return NextResponse.json({ hmac: hash });
  } catch (error) {
    console.error('Error generating HMAC:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = body.email as string;

  if (!email) {
    return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid email' }, { status: 400 });
  }

  const { error } = await supabase
    .from('subscribers')
    .insert([{ email }]);

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ success: false, message: 'Already subscribed', alreadySubscribed: true }, { status: 200 });
    }
    return NextResponse.json({ success: false, message: 'Subscription failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Successfully subscribed! Check your email for confirmation.' }, { status: 200 });
}

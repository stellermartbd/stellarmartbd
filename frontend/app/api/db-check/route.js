import { NextResponse } from 'next/server';
// আপনার ডেটাবেস কানেকশন ফাইলটি ইমপোর্ট করুন (যেমন mongoose বা prisma)
import db from '@/lib/db'; 

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: "Database Connected Successfully! ✅" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Database Connection Failed! ❌", error: error.message }, { status: 500 });
  }
}

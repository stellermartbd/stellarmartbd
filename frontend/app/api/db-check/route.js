import { NextResponse } from 'next/server';
// নিচের লাইনটি নিশ্চিত করবে যে db.js ফাইলটি ঠিকমতো লোড হচ্ছে
import dbConnect from '@/lib/db'; 

export async function GET() {
  try {
    // এখানে dbConnect() কল করা হচ্ছে আপনার ডেটাবেসের সাথে কানেকশন চেক করতে
    await dbConnect();
    return NextResponse.json({ 
      success: true,
      message: "Database Connected Successfully! ✅" 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      message: "Database Connection Failed! ❌", 
      error: error.message 
    }, { status: 500 });
  }
}

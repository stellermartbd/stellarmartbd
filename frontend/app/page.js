// page.js theke 'use client'; soriye felun
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
// ... baki imports ...
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products = [];
  try {
    await connectDB();
    const data = await Product.find({}).limit(10).lean();
    products = JSON.parse(JSON.stringify(data));
  } catch (err) {
    console.error("Database connection failed:", err);
  }

  return (
    <main className="min-h-screen bg-[#f4f7f9]">
       {/* ... Components ... */}
       <FeaturedProducts products={products} />
    </main>
  );
}

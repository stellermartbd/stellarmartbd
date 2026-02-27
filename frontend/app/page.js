// 'use client' সরিয়ে দিলাম যাতে সরাসরি ডাটাবেস ব্যবহার করা যায়
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FlashSale from '@/components/home/FlashSale';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import BannerSection from '@/components/home/BannerSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Newsletter from '@/components/home/Newsletter';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

export default async function Home() {
  let featuredProducts = [];
  let newArrivals = [];

  try {
    await connectDB();
    // ডাটাবেস থেকে ডাটা আনা
    featuredProducts = await Product.find({ isFeatured: true }).limit(8).lean();
    newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8).lean();
  } catch (error) {
    console.error("Data Fetching Error:", error);
  }

  return (
    <main className="min-h-screen bg-[#f4f7f9] overflow-x-hidden">
      <HeroSection />

      <div className="container mx-auto px-4 py-10">
        <CategorySection />
      </div>

      <section className="bg-white py-12 shadow-inner">
        <div className="container mx-auto px-4">
          <FlashSale />
        </div>
      </section>

      <BannerSection />

      {/* ডাইনামিক ডাটা পাস করা হলো */}
      <section className="container mx-auto px-4 py-16">
        <FeaturedProducts products={JSON.parse(JSON.stringify(featuredProducts))} />
      </section>

      <section className="bg-[#eef2f5] py-16">
        <div className="container mx-auto px-4">
          <NewArrivals products={JSON.parse(JSON.stringify(newArrivals))} />
        </div>
      </section>

      <WhyChooseUs />
      <Newsletter />
    </main>
  );
}

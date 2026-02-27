import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FlashSale from '@/components/home/FlashSale';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import BannerSection from '@/components/home/BannerSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Newsletter from '@/components/home/Newsletter';

// ডাটাবেস ও মডেল ইমপোর্ট
import connectDB from '@/lib/db'; 
import Product from '@/models/Product';

// সার্ভারকে নির্দেশ দেওয়া যাতে সে পেজটি ক্যাশ (Cache) না করে সবসময় টাটকা ডেটা দেখায়
export const dynamic = 'force-dynamic';

export default async function Home() {
  let featuredProducts = [];
  let newArrivals = [];

  try {
    // ডাটাবেস কানেক্ট করা
    await connectDB();

    // ১. জনপ্রিয় পণ্য আনা (Featured Collection)
    const featuredData = await Product.find({ isFeatured: true }).limit(8).lean();
    featuredProducts = JSON.parse(JSON.stringify(featuredData));

    // ২. নতুন পণ্য আনা (New Arrivals)
    const arrivalsData = await Product.find().sort({ createdAt: -1 }).limit(8).lean();
    newArrivals = JSON.parse(JSON.stringify(arrivalsData));

  } catch (error) {
    console.error("Database Fetching Error:", error);
    // ডাটা না পেলে খালি অ্যারে থাকবে যাতে সাইট ক্র্যাশ না করে
  }

  return (
    <main className="min-h-screen bg-[#f4f7f9] overflow-x-hidden">
      <HeroSection />

      {/* ক্যাটাগরি সেকশন */}
      <div className="container mx-auto px-4 py-10">
        <CategorySection />
      </div>

      {/* ফ্ল্যাশ সেল */}
      <section className="bg-white py-12 shadow-inner">
        <div className="container mx-auto px-4">
          <FlashSale />
        </div>
      </section>

      <BannerSection />

      {/* ৫. ডাইনামিক জনপ্রিয় পণ্য */}
      <section className="container mx-auto px-4 py-16">
        <FeaturedProducts products={featuredProducts} />
      </section>

      {/* ৬. ডাইনামিক নিউ অ্যারাইভালস */}
      <section className="bg-[#eef2f5] py-16">
        <div className="container mx-auto px-4">
          <NewArrivals products={newArrivals} />
        </div>
      </section>

      <WhyChooseUs />
      <Newsletter />
    </main>
  );
}

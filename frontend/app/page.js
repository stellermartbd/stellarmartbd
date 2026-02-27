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

// বিল্ড টাইমে স্ট্যাটিক জেনারেশন বন্ধ করে ডাইনামিক রেন্ডারিং নিশ্চিত করা
export const dynamic = 'force-dynamic';

export default async function Home() {
  let featuredProducts = [];
  let newArrivals = [];

  try {
    await connectDB();

    // ডাটাবেস থেকে পণ্য আনা
    const featuredData = await Product.find({ isFeatured: true }).limit(8).lean();
    featuredProducts = JSON.parse(JSON.stringify(featuredData));

    const arrivalsData = await Product.find().sort({ createdAt: -1 }).limit(8).lean();
    newArrivals = JSON.parse(JSON.stringify(arrivalsData));

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

      {/* ডাইনামিক ডাটা প্রোডাক্ট গ্রিডে পাঠানো হচ্ছে */}
      <section className="container mx-auto px-4 py-16">
        <FeaturedProducts products={featuredProducts} />
      </section>

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

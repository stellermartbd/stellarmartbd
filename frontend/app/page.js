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

// Vercel deployment-e dynamic data fetching nishchit korar jonno
export const dynamic = 'force-dynamic';

export default async function Home() {
  let products = [];
  let isConnected = false;

  try {
    // 1. Database Connect kora hochche
    await connectDB();
    isConnected = true;
    
    // 2. Data Fetch kora hochche (Lean use kora hoyecha performance-er jonno)
    const data = await Product.find({}).sort({ createdAt: -1 }).limit(10).lean();
    
    // 3. Serialization error erate JSON conversion
    if (data && data.length > 0) {
      products = JSON.parse(JSON.stringify(data));
    }
  } catch (err) {
    console.error("Critical Error on Home Page:", err.message);
    isConnected = false;
  }

  return (
    <main className="min-h-screen bg-[#f4f7f9] overflow-x-hidden">
      {/* Hero section sob shomoy dekhabe */}
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

      {/* Featured Products: Data thakle dekhabe, na thakle ekti message dekhabe */}
      <section className="container mx-auto px-4 py-16">
        {!isConnected ? (
          <div className="text-center py-10 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 font-semibold">Database connection failed. Please check MONGODB_URI on Vercel.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-600 font-semibold">No products found. Please add products from your MongoDB dashboard.</p>
          </div>
        ) : (
          <FeaturedProducts products={products} />
        )}
      </section>

      <section className="bg-[#eef2f5] py-16">
        <div className="container mx-auto px-4">
          <NewArrivals products={products} />
        </div>
      </section>

      <WhyChooseUs />
      <Newsletter />
    </main>
  );
}

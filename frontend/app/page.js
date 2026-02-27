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

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products = [];
  let isConnected = false;

  try {
    await connectDB();
    isConnected = true;
    
    // lean() er por data serialize kora hoyeche
    const data = await Product.find({}).sort({ createdAt: -1 }).limit(10).lean();
    
    if (data) {
      products = JSON.parse(JSON.stringify(data));
    }
  } catch (err) {
    console.error("Critical Error on Home Page:", err.message);
    isConnected = false;
  }

  return (
    <main className="min-h-screen bg-[#f4f7f9] overflow-x-hidden">
      <HeroSection />

      <div className="container mx-auto px-4 py-10">
        <CategorySection />
      </div>

      <section className="bg-white py-12 shadow-inner">
        <div className="container mx-auto px-4">
          {/* products pass kore din jodi FlashSale-e proyojon hoy */}
          <FlashSale products={products} /> 
        </div>
      </section>

      <BannerSection />

      <section className="container mx-auto px-4 py-16">
        {!isConnected ? (
          <div className="text-center py-10 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 font-semibold">Database issue detected. Please check logs.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-600 font-semibold">Welcome to Turjo Site! Start by adding some products.</p>
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

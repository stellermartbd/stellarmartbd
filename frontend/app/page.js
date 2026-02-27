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

// Vercel-e dynamic data fetching nishchit korar jonno
export const dynamic = 'force-dynamic';

export default async function Home() {
  let products = [];
  let dbError = false;

  try {
    // Database connection
    await connectDB();
    
    // Data fetch kora hochche. Jodi database-e product na thake crash korbe na.
    const data = await Product.find({}).sort({ createdAt: -1 }).limit(10).lean();
    
    if (data) {
      products = JSON.parse(JSON.stringify(data));
    }
  } catch (err) {
    console.error("Database connection or fetching failed:", err);
    dbError = true;
  }

  return (
    <main className="min-h-screen bg-[#f4f7f9] overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <div className="container mx-auto px-4 py-10">
        <CategorySection />
      </div>

      {/* Flash Sale Section */}
      <section className="bg-white py-12 shadow-inner">
        <div className="container mx-auto px-4">
          <FlashSale />
        </div>
      </section>

      {/* Banner Section */}
      <BannerSection />

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        {dbError ? (
          <div className="text-center py-10 text-red-500">
            Unable to load products. Please check database connection.
          </div>
        ) : (
          <FeaturedProducts products={products} />
        )}
      </section>

      {/* New Arrivals Section */}
      <section className="bg-[#eef2f5] py-16">
        <div className="container mx-auto px-4">
          <NewArrivals products={products} />
        </div>
      </section>

      {/* Why Choose Us & Newsletter */}
      <WhyChooseUs />
      <Newsletter />
    </main>
  );
}

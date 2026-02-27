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
  try {
    await connectDB();
    // MongoDB theke data ana hochche
    const data = await Product.find({}).limit(10).lean();
    products = JSON.parse(JSON.stringify(data));
  } catch (err) {
    console.error("Database error:", err);
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
      <section className="container mx-auto px-4 py-16">
        <FeaturedProducts products={products} />
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

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FlashSale from '@/components/home/FlashSale';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Newsletter from '@/components/home/Newsletter';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export default async function Home() {
  // ডাটাবেস কানেকশন
  await connectDB();
  
  // ডাইনামিক ডেটা ফেচিং (ডামি ডাটা রিপ্লেস করার জন্য)
  const products = await Product.find({}).limit(8).lean();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        
        {/* ডাটাবেস থেকে আসা প্রোডাক্টগুলো এখানে পাস করুন */}
        <FeaturedProducts products={products} />
        
        <FlashSale />
        
        {/* আপনার অন্যান্য কম্পোনেন্টগুলো এখানে যোগ করুন */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}


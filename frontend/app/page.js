import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FlashSale from '@/components/home/FlashSale';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Newsletter from '@/components/home/Newsletter';
import connectDB from '@/lib/db'; // { connectDB } সরিয়ে শুধু connectDB লিখুন
import Product from '@/models/Product';

export default async function Home() {
  try {
    // ডাটাবেস কানেকশন
    await connectDB();
    
    // ডাটাবেস থেকে ডাইনামিক ডেটা আনা
    // lean() ব্যবহার করা হয়েছে যাতে ডাটাগুলো প্লেইন জাভাস্ক্রিপ্ট অবজেক্ট হিসেবে আসে
    const products = await Product.find({}).limit(8).lean();

    return (
      <>
        <Navbar />
        <main>
          <HeroSection />
          
          {/* ডাটাবেস থেকে আসা আসল প্রোডাক্টগুলো এখানে পাস হচ্ছে */}
          <FeaturedProducts products={JSON.parse(JSON.stringify(products))} />
          
          <FlashSale />
          
          <Newsletter />
        </main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Home Page Error:", error);
    return <div>সাইট লোড হতে সমস্যা হচ্ছে। দয়া করে একটু পর চেষ্টা করুন।</div>;
  }
}

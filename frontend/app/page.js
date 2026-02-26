import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FlashSale from '@/components/home/FlashSale';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section - এতে সাধারণত এনিমেশন থাকে */}
      <section className="animate-fade-in">
        <HeroSection />
      </section>

      {/* Featured Categories - একটু গ্যাপ বাড়ানো হয়েছে */}
      <section className="py-8 md:py-12 bg-white">
        <FeaturedCategories />
      </section>

      {/* Flash Sale - হাইলাইট করার জন্য আলাদা ব্যাকগ্রাউন্ড */}
      <section className="py-10 bg-gray-50">
        <FlashSale />
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <FeaturedProducts />
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-gray-50">
        <NewArrivals />
      </section>

      {/* Why Choose Us - ট্রাস্ট বিল্ড করার জন্য গুরুত্বপূর্ণ */}
      <section className="py-16 bg-white border-t border-gray-100">
        <WhyChooseUs />
      </section>

      {/* Newsletter - ফুটারে সুন্দর ফিনিশিং */}
      <section className="bg-primary-900 text-white">
        <Newsletter />
      </section>
    </main>
  );
}

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata = {
  title: 'StellarMartBD - Bangladesh\'s Trusted Online Shopping',
  description: 'StellarMartBD is your one-stop online shopping destination in Bangladesh. Shop electronics, fashion, home appliances and more at best prices.',
  keywords: 'online shopping, Bangladesh, e-commerce, electronics, fashion',
  openGraph: {
    title: 'StellarMartBD - Bangladesh\'s Trusted Online Shopping',
    description: 'Shop electronics, fashion, home appliances and more at best prices',
    type: 'website',
    locale: 'bn_BD',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="font-english">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
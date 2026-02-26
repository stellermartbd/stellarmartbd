import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata = {
  title: 'StellarMartBD - Bangladesh\'s Trusted Online Shopping',
  description: 'StellarMartBD is your one-stop online shopping destination in Bangladesh.',
  // ... বাকি মেটাডেটা ...
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

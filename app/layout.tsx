import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { SecondaryNav } from '@/components/layout/SecondaryNav';
import { AdBanner } from '@/components/ui/AdBanner';
import { CartDrawer } from '@/components/ui/CartDrawer';
import GlobalLoader from '@/components/ui/GlobalLoader';
import { WhatsAppWidget } from '@/components/ui/WhatsAppWidget';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'PrintCraft – Premium 3D Printed Decor',
    template: '%s | PrintCraft',
  },
  description:
    'Discover unique, handcrafted 3D printed home decor, planters, lamps, desk accessories, and collectible figures. Modern design, made to order.',
  keywords: ['3D printing', 'home decor', 'planters', 'lamps', 'figures', 'Bangladesh'],
  openGraph: {
    type: 'website',
    title: 'PrintCraft – Premium 3D Printed Decor',
    description: 'Unique 3D printed home decor and collectibles, handcrafted in Bangladesh.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SecondaryNav />
        <GlobalLoader />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AdBanner />
        <CartDrawer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}

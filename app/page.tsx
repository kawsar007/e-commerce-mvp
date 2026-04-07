import type { Metadata } from 'next';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ProductsSection } from '@/components/home/ProductsSection';
import { getFeaturedProducts, getRecentProducts } from '@/lib/mockData';

export const metadata: Metadata = {
  title: 'PrintCraft – Premium 3D Printed Decor',
  description:
    'Discover unique handcrafted 3D printed home decor, planters, lamps, desk accessories, and collectible figures.',
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const recent = getRecentProducts(10);

  return (
    <>
      <HeroCarousel />

      {/* Announcement bar */}
      <div className="bg-brand-600 text-white text-center text-xs py-2.5 tracking-widest uppercase font-medium">
        Free delivery on orders above ৳2,000 &nbsp;·&nbsp; Made to order in 3–5 days
      </div>

      <CategoriesSection />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-stone-200" />
      </div>

      <ProductsSection
        title="Featured Items"
        subtitle="Handpicked For You"
        products={featured}
        viewAllHref="/products"
        scroll={true}
      />

      {/* Mid-page banner */}
      <div className="bg-stone-950 py-16 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-brand-400 font-medium mb-4">
            Printed with precision
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-6">
            Every piece is made to order
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-base leading-relaxed mb-8">
            We don't mass-produce. Each item is printed fresh, quality-checked, and shipped
            directly to your door within 3–5 business days.
          </p>
          <a href="/products" className="btn-primary px-10 py-4 text-base">
            Explore All Products
          </a>
        </div>
      </div>

      <ProductsSection
        title="Recently Added"
        subtitle="New Arrivals"
        products={recent}
        viewAllHref="/products"
        scroll={true}
      />
    </>
  );
}

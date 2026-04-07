import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/types';

interface ProductsSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  scroll?: boolean;
}

export function ProductsSection({
  title,
  subtitle,
  products,
  viewAllHref = '/products',
  scroll = false,
}: ProductsSectionProps) {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-end justify-between mb-10">
        <div>
          {subtitle && (
            <p className="text-xs tracking-[0.25em] uppercase text-brand-600 font-medium mb-2">{subtitle}</p>
          )}
          <h2
            id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="section-title"
          >
            {title}
          </h2>
        </div>
        <Link
          href={viewAllHref}
          className="hidden sm:flex items-center gap-1.5 text-sm text-stone-500 hover:text-brand-600 transition-colors font-medium"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {scroll ? (
        /* Horizontal scroll on mobile, grid on desktop */
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="min-w-[200px] sm:min-w-0 w-[200px] sm:w-auto"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="sm:hidden mt-6 text-center">
        <Link href={viewAllHref} className="btn-secondary px-8">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </section>
  );
}

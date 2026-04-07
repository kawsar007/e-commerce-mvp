'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product, Category } from '@/types';

interface Props {
  products: Product[];
  categories: Category[];
}

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

export function ProductsPageClient({ products, categories }: Props) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState('default');

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      const found = categories.find((c) => c.slug === cat);
      if (found) setActiveCategory(found.id);
    }
  }, [searchParams, categories]);

  // Filter + sort
  const filtered = products
    .filter((p) => activeCategory === 'all' || p.categoryId === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

  const activeCategoryName =
    activeCategory === 'all'
      ? 'All Products'
      : categories.find((c) => c.id === activeCategory)?.name ?? 'Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-stone-400 mb-6" aria-label="Breadcrumb">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span className="text-stone-700 font-medium">{activeCategoryName}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="md:w-52 shrink-0" aria-label="Product filters">
          <h2 className="text-xs tracking-[0.2em] uppercase font-semibold text-stone-500 mb-4">Categories</h2>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-stone-900 text-white font-medium'
                    : 'text-stone-600 hover:text-brand-600 hover:bg-stone-50'
                }`}
              >
                All Products
                <span className="ml-2 text-xs opacity-60">({products.length})</span>
              </button>
            </li>
            {categories.map((cat) => {
              const count = products.filter((p) => p.categoryId === cat.id).length;
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-stone-900 text-white font-medium'
                        : 'text-stone-600 hover:text-brand-600 hover:bg-stone-50'
                    }`}
                  >
                    {cat.name}
                    <span className="ml-2 text-xs opacity-60">({count})</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-light text-stone-900">{activeCategoryName}</h1>
              <span className="text-sm text-stone-400">({filtered.length})</span>
              {activeCategory !== 'all' && (
                <button
                  onClick={() => setActiveCategory('all')}
                  className="ml-2 flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 border border-stone-300 px-2 py-1"
                  aria-label="Clear category filter"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-stone-200 bg-white text-stone-700 px-3 py-1.5 focus:outline-none focus:border-brand-400"
                aria-label="Sort products"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-stone-400">
              <p className="text-lg font-display">No products found</p>
              <p className="text-sm mt-2">Try a different category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

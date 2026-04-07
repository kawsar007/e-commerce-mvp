import type { Metadata } from 'next';
import { products, categories } from '@/lib/mockData';
import { ProductsPageClient } from './ProductsPageClient';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our full collection of 3D printed home decor, planters, lamps, desk accessories, and collectible figures.',
};

export default function ProductsPage() {
  return <ProductsPageClient products={products} categories={categories} />;
}

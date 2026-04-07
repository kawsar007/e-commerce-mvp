import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById, getCategoryById } from '@/lib/mockData';
import { ProductDetailClient } from './ProductDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const category = getCategoryById(product.categoryId);

  return <ProductDetailClient product={product} category={category} />;
}

import rawData from '@/data/products.json';
import type { Category, Product } from '@/types';

const data = rawData as { categories: Category[]; products: Product[] };

export const categories: Category[] = data.categories;
export const products: Product[] = data.products;

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.isFeatured);

export const getRecentProducts = (limit = 10): Product[] =>
  [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit);

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (categoryId: string): Product[] =>
  products.filter((p) => p.categoryId === categoryId);

export const getCategoryById = (id: string): Category | undefined =>
  categories.find((c) => c.id === id);

export const formatPrice = (price: number): string =>
  `৳${price.toLocaleString('en-BD')}`;

// Placeholder image used when real product images are not available
export const getProductImage = (src: string, fallbackSeed?: string): string => {
  // Use a seeded Unsplash photo based on product name for beautiful placeholders
  const seeds: Record<string, string> = {
    'abstract-wall-art': 'https://images.unsplash.com/photo-1600978398568-48175fd97cce?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'minimalist-vase': 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80',
    'decorative-sculpture': 'https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=600&q=80',
    'wall-clock': 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80',
    'art-frame': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
    'geometric-planter': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
    'hanging-pot': 'https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=600&q=80',
    'mini-desk-planter': 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=600&q=80',
    'modern-pot-set': 'https://images.unsplash.com/photo-1534710961216-75c88202f43e?w=600&q=80',
    'succulent-planter': 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=600&q=80',
    'moon-lamp': 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'spiral-lamp': 'https://images.unsplash.com/photo-1603356033288-acfcb54801e6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'led-table-lamp': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    'night-light-cube': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
    'galaxy-lamp': 'https://plus.unsplash.com/premium_photo-1724628171862-9d5267346e49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'pen-holder': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80',
    'cable-organizer': 'https://images.unsplash.com/photo-1652863299050-15c836e15ae4?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'laptop-stand': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    'phone-stand': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
    'desk-organizer-box': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    'anime-figure-naruto': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&q=80',
    'dragon-model': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    'superhero-statue': 'https://images.unsplash.com/photo-1666206136577-47752bf6f40b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'mini-character-set': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80',
    'game-character-figure': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
  };

  // Map category images
  const catImages: Record<string, string> = {
    'home-decor': 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
    'planters': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
    'lamps': 'https://images.unsplash.com/photo-1513506003901-1e6a35082bf8?w=600&q=80',
    'desk': 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    'figures': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&q=80',
  };

  if (fallbackSeed) {
    for (const [key, url] of Object.entries(seeds)) {
      if (fallbackSeed.includes(key)) return url;
    }
    for (const [key, url] of Object.entries(catImages)) {
      if (fallbackSeed.includes(key)) return url;
    }
  }

  return `https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80`;
};

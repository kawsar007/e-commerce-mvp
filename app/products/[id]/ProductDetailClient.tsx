'use client';

import { ProductCard } from '@/components/product/ProductCard';
import { products as allProducts, formatPrice, getProductImage } from '@/lib/mockData';
import { useCartStore } from '@/store/cartStore';
import type { Category, Product } from '@/types';
import {
  CheckCircle,
  ChevronRight,
  MessageCircle,
  Minus,
  Plus,
  Ruler,
  ShoppingCart, Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  product: Product;
  category?: Category;
}

export function ProductDetailClient({ product, category }: Props) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  // Use Unsplash images mapped by slug for demo
  const imgSrc = (idx: number) => getProductImage(product.images[idx] ?? product.images[0], product.slug);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOrderNow = () => {
    addItem(product, quantity);
    router.push('/checkout');
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi! I'd like to order:\n\n*${product.name}*\nQty: ${quantity}\nPrice: ${formatPrice(product.price)} each\nTotal: ${formatPrice(product.price * quantity)}\n\nPlease confirm availability.`
    );
    window.open(`https://wa.me/8801700000000?text=${msg}`, '_blank');
  };

  // Related products (same category, exclude current)
  const related = allProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-stone-400 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/products" className="hover:text-stone-600 transition-colors">Shop</Link>
        {category && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/products?category=${category.slug}`} className="hover:text-stone-600 transition-colors">
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3" />
        <span className="text-stone-700 font-medium truncate max-w-[150px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="relative aspect-square bg-stone-100 overflow-hidden">
            <Image
              src={imgSrc(activeImg)}
              alt={`${product.name} - image ${activeImg + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`relative shrink-0 w-16 h-16 bg-stone-100 overflow-hidden border-2 transition-colors ${activeImg === idx ? 'border-brand-500' : 'border-transparent hover:border-stone-300'
                    }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={imgSrc(idx)}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {category && (
            <Link
              href={`/products?category=${category.slug}`}
              className="inline-block text-xs tracking-[0.2em] uppercase text-brand-600 font-medium hover:text-brand-700 transition-colors"
            >
              {category.name}
            </Link>
          )}

          {/* <h1 className="font-display text-3xl md:text-4xl font-light text-stone-900 leading-tight">
            {product.name}
          </h1> */}

          <h1 className="font-['Bebas_Neue'] font-sans text-3xl md:text-4xl font-light text-stone-900 leading-tight leading-[1.2em] tracking-[0.7px]">
            {product.name}
          </h1>

          <p className="text-stone-500 leading-relaxed">{product.description}</p>

          {/* Price */}
          <div className="py-4 border-y border-stone-200">
            {/* <span className="font-display text-4xl font-semibold text-brand-600">
              {formatPrice(product.price)}
            </span> */}

            <span className="text-brand-600 text-center font-semibold text-xl mb-3">
              {formatPrice(product.price)}
            </span>

            <p className="text-xs text-stone-400 mt-1">Inclusive of all taxes · Made to order</p>
          </div>

          {/* Dimensions */}
          <div className="bg-stone-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 tracking-widest uppercase mb-3">
              <Ruler className="w-3.5 h-3.5" /> Dimensions
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Width', value: product.dimensions.width },
                { label: 'Height', value: product.dimensions.height },
                { label: 'Depth', value: product.dimensions.depth },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white p-2 border border-stone-200">
                  <p className="text-lg font-semibold text-stone-600">{value}</p>
                  <p className="text-xs text-stone-400">{label} ({product.dimensions.unit})</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="label">Quantity</p>
            <div className="flex items-center gap-0 w-fit border border-stone-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors border-r border-stone-300"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-sm font-medium text-stone-800" aria-live="polite">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors border-l border-stone-300"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              className="btn-secondary flex items-center justify-center gap-2 py-4"
              aria-label="Add to cart"
            >
              {added ? (
                <><CheckCircle className="w-4 h-4 text-green-600" /> Added!</>
              ) : (
                <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
              )}
            </button>
            <button
              onClick={handleOrderNow}
              className="btn-primary flex items-center justify-center gap-2 py-4"
              aria-label="Order now"
            >
              <Zap className="w-4 h-4" /> Order Now
            </button>
          </div>

          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            Order on WhatsApp
          </button>

          {/* Trust signals */}
          <div className="pt-2 space-y-2">
            {[
              '✓ Made to order in 3–5 business days',
              '✓ Quality checked before dispatch',
              '✓ Easy returns within 7 days',
            ].map((t) => (
              <p key={t} className="text-xs text-stone-500">{t}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-20 pt-10 border-t border-stone-200">
          <h2 className="section-title mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

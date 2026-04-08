'use client';

import { formatPrice, getProductImage } from '@/lib/mockData';
import { useCartStore } from '@/store/cartStore';
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const VALID_COUPONS: Record<string, number> = {
  PRINT10: 10,
  CRAFT20: 20,
  WELCOME: 15,
};

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [discountPct, setDiscountPct] = useState(0);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 2000 ? 0 : 120;
  const discountAmt = Math.round((subtotal * discountPct) / 100);
  const total = subtotal - discountAmt + shipping;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setDiscountPct(VALID_COUPONS[code]);
      setCouponStatus({ type: 'success', msg: `${VALID_COUPONS[code]}% discount applied!` });
    } else {
      setDiscountPct(0);
      setCouponStatus({ type: 'error', msg: 'Invalid coupon code. Try PRINT10.' });
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-stone-300 mb-6" />
        <h1 className="font-display text-3xl font-light text-stone-800 mb-3">Your cart is empty</h1>
        <p className="text-stone-500 mb-8">Add some beautiful pieces to get started.</p>
        <Link href="/products" className="btn-primary px-10 py-4 text-base">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-light text-stone-900 mb-8">
        Shopping Cart
        <span className="ml-3 text-lg text-stone-400 font-sans font-normal">({items.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 bg-white p-4 sm:p-5 shadow-sm">
              {/* Image */}
              <Link href={`/products/${product.id}`} className="shrink-0">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-stone-100 overflow-hidden">
                  <Image
                    src={getProductImage(product.images[0], product.slug)}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/products/${product.id}`}
                      className="font-medium text-stone-800 hover:text-brand-600 transition-colors text-sm leading-snug block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-stone-400 mt-0.5">{product.shortDescription}</p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="shrink-0 text-stone-400 hover:text-red-500 transition-colors p-1"
                    aria-label={`Remove ${product.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                  {/* Quantity */}
                  <div className="flex items-center border border-stone-200">
                    <button
                      onClick={() => quantity > 1 ? updateQuantity(product.id, quantity - 1) : removeItem(product.id)}
                      className="w-8 h-8 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-medium" aria-live="polite">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-stone-800 shrink-0">
                      {formatPrice(product.price * quantity)}
                    </p>
                    {quantity > 1 && (
                      <p className="text-xs text-stone-400">{formatPrice(product.price)} each</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-stone-600 mb-4">
              <Tag className="w-4 h-4 inline-block mr-1.5" />Coupon Code
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Enter code…"
                className="input-field flex-1"
                aria-label="Coupon code"
                onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
              />
              <button
                onClick={applyCoupon}
                className="btn-primary px-4 py-3 text-xs"
              >
                Apply
              </button>
            </div>
            {couponStatus && (
              <p className={`text-xs mt-2 font-medium ${couponStatus.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                {couponStatus.msg}
              </p>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-stone-600 pb-3 border-b border-stone-100">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discountPct}%)</span>
                  <span>-{formatPrice(discountAmt)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-stone-400">Free shipping on orders above ৳2,000</p>
              )}
            </div>

            <div className="border-t border-stone-200 pt-3 flex justify-between items-center">
              <span className="font-semibold text-stone-800">Total</span>
              <span className="text-xl font-semibold text-brand-600">{formatPrice(total)}</span>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="btn-primary w-full py-4 text-base justify-center mt-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <Link href="/products" className="block text-center text-xs text-stone-400 hover:text-stone-600 transition-colors mt-2">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

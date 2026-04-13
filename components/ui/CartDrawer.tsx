'use client';

/**
 * CartDrawer — v2
 * ───────────────
 * Matches the reference screenshots exactly:
 *
 * 1. Floating cart badge (bottom-right) — teal pill showing item count + total.
 *    Always visible when cart has items. Clicking it opens the drawer.
 *
 * 2. Slide-in drawer from the right — white panel, rounded close button,
 *    product rows with thumbnail / name / price / qty controls / trash icon,
 *    sticky subtotal footer with "Proceed to Checkout" teal button.
 *
 * Zero impact on other components — all state lives in useCartStore.
 */

import { formatPrice, getProductImage } from '@/lib/mockData';
import { useCartStore } from '@/store/cartStore';
import { ChevronRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

/* ─── Floating cart badge icon (matches screenshot) ─────────── */
function CartBagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z"
      />
    </svg>
  );
}

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQuantity);

  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const totalPrice = useCartStore((s) => s.getTotalPrice());
  const totalItems = useCartStore((s) => s.getTotalItems());

  const panelRef = useRef<HTMLDivElement>(null);


  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen, closeDrawer]);

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Move focus into panel on open */
  useEffect(() => {
    if (isOpen) setTimeout(() => panelRef.current?.focus(), 50);
  }, [isOpen]);

  return (
    <>
      {/* ══════════════════════════════════════════════════
          FLOATING CART BADGE
          Matches Image 1: teal pill, bottom-right corner,
          bag icon + "N Items" + formatted total.
          Only visible when cart has items.
          ══════════════════════════════════════════════════ */}
      {hasHydrated && totalItems > 0 && (
        <button
          onClick={openDrawer}
          aria-label={
            hasHydrated
              ? `Open cart — ${totalItems} items, ${formatPrice(totalPrice)}`
              : 'Open cart'
          }
          className="fixed bottom-24 right-0 z-40 flex flex-col items-center justify-center text-white shadow-xl transition-all duration-200 hover:right-0.5 hover:shadow-2xl active:scale-95"
          style={{
            backgroundColor: '#0e7490',
            borderRadius: '12px 0 0 12px',
            padding: '10px 14px',
            minWidth: '80px',
          }}
        >
          <CartBagIcon />
          <span className="text-[11px] font-semibold mt-1 leading-none">
            {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
          </span>
          <span
            className="text-[11px] font-bold mt-1.5 px-2 py-0.5 rounded leading-none"
            style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
          >
            {formatPrice(totalPrice)}
          </span>
        </button>
      )}

      {/* ══════════════════════════════════════════════════
          BACKDROP
          ══════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className="fixed inset-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.45)',
          backdropFilter: isOpen ? 'blur(2px)' : 'none',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* ══════════════════════════════════════════════════
          SLIDE-IN PANEL
          Matches Image 2: white, max-w ~400px, header with
          "Your Cart (N)", item rows, sticky footer.
          ══════════════════════════════════════════════════ */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className="fixed top-0 right-0 z-50 h-full bg-white shadow-2xl flex flex-col outline-none"
        style={{
          width: 'min(420px, 100vw)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* ── Header ──────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            {/* Teal bag icon in a soft circle — matches screenshot */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#e0f2f9' }}
            >
              <ShoppingBag className="w-5 h-5" style={{ color: '#0e7490' }} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base leading-tight">
                Your Cart
                <span className="ml-1.5 text-gray-400 font-normal">
                  {/* ({totalItems}) */}
                  {hasHydrated ? totalItems : 0}
                </span>
              </h2>
              {hasHydrated && totalItems > 0 && (
                <p className="text-xs text-gray-400 leading-tight">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your bag
                </p>
              )}
            </div>
          </div>

          {/* Close — round button */}
          <button
            onClick={closeDrawer}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Empty state ─────────────────────────────── */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#f0f9ff' }}
            >
              <ShoppingBag className="w-9 h-9" style={{ color: '#bae6fd' }} />
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Add some items to get started!</p>
            </div>
            <button
              onClick={closeDrawer}
              className="mt-1 px-8 py-3 text-sm text-white font-semibold rounded hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#0e7490' }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* ── Item list ───────────────────────────── */}
            <ul
              className="flex-1 overflow-y-auto py-2"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}
            >
              {items.map(({ product, quantity }) => {
                const img = getProductImage(product.images[0], product.slug);
                const lineTotal = product.price * quantity;

                return (
                  <li
                    key={product.id}
                    className="flex items-start gap-3.5 px-5 py-4 border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    {/* Thumbnail — matches screenshot: rounded, bordered */}
                    <Link
                      href={`/products/${product.id}`}
                      onClick={closeDrawer}
                      className="shrink-0 block"
                      tabIndex={isOpen ? 0 : -1}
                    >
                      <div
                        className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                        style={{ width: 76, height: 76 }}
                      >
                        <Image
                          src={img}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      {/* Name + trash on same row */}
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          onClick={closeDrawer}
                          className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-[#0e7490] transition-colors flex-1"
                          tabIndex={isOpen ? 0 : -1}
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="shrink-0 w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price per unit */}
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatPrice(product.price)} each
                      </p>

                      {/* Qty controls + line total */}
                      <div className="flex items-center justify-between mt-2.5">
                        {/* Stepper — matches screenshot */}
                        <div
                          className="flex items-center rounded-lg overflow-hidden border border-gray-200"
                          style={{ height: 32 }}
                        >
                          <button
                            onClick={() =>
                              quantity > 1
                                ? updateQty(product.id, quantity - 1)
                                : removeItem(product.id)
                            }
                            className="w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors h-full"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span
                            className="w-9 text-center text-sm font-semibold text-gray-800 border-x border-gray-200 h-full flex items-center justify-center"
                            aria-live="polite"
                          >
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQty(product.id, quantity + 1)}
                            className="w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors h-full"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line total */}
                        <span
                          className="text-sm font-bold"
                          style={{ color: '#0e7490' }}
                        >
                          {formatPrice(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* ── Footer / Summary ────────────────────── */}
            <div className="border-t border-gray-100 bg-white px-5 pt-4 pb-5 space-y-3">
              {/* Subtotal row — matches screenshot */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 font-medium">Subtotal</span>
                <span className="text-base font-bold text-gray-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Free shipping nudge */}
              {totalPrice < 2000 && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                  style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}
                >
                  <span>🚚</span>
                  <span>
                    Add <strong>{formatPrice(2000 - totalPrice)}</strong> more for free shipping!
                  </span>
                </div>
              )}

              {/* Proceed to Checkout — matches screenshot: full-width teal, rounded */}
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-white text-sm font-bold rounded-xl transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: '#0e7490' }}
                tabIndex={isOpen ? 0 : -1}
              >
                Proceed to Checkout
                <ChevronRight className="w-4 h-4" />
              </Link>

              {/* Secondary: view full cart page */}
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="flex items-center justify-center w-full py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                tabIndex={isOpen ? 0 : -1}
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
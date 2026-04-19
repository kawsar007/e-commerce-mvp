'use client';

/**
 * AdBanner — Centered Popup Advertisement
 * ─────────────────────────────────────────
 * Usage:
 *   1. Import and place <AdBanner /> once in app/layout.tsx (renders globally)
 *   2. Or place it on a specific page like app/page.tsx (home only)
 *
 * Features:
 *   • Auto-shows after `DELAY_MS` on first visit
 *   • "Don't show again" persists to localStorage
 *   • Closes on backdrop click, X button, or Escape key
 *   • Countdown timer auto-closes after `AUTO_CLOSE_SEC` seconds
 *   • Body scroll locked while open
 *   • Fully responsive — mobile + desktop
 *   • Matches PrintCraft teal (#0e7490) design system
 */

import { ChevronRight, Clock, Tag, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

// ── Configuration — edit these ───────────────────────────────
const DELAY_MS = 2000;          // ms before banner appears
const AUTO_CLOSE_SEC = 30;            // countdown before auto-close (0 = disabled)
const STORAGE_KEY = 'pc_ad_dismissed'; // localStorage key
const SNOOZE_DAYS = 3;             // days before showing again after "don't show"

// ── Offer data — edit these freely ──────────────────────────
const OFFERS = [
  {
    id: 1,
    badge: '🔥 Flash Sale',
    headline: 'Up to 40% Off',
    subheadline: 'Premium 3D Printed Decor',
    description: 'Limited time offer on all Home Decor and Lamp collections. Handcrafted and made to order.',
    coupon: 'FLASH40',
    discount: '40% OFF',
    cta: 'Shop the Sale',
    href: '/products',
    accent: '#0e7490',
    accentLight: '#e0f2f9',
    tag1: 'Free delivery above ৳2,000',
    tag2: '3-5 day delivery',
  },
  {
    id: 2,
    badge: '🎁 New Arrivals',
    headline: 'Fresh Drops This Week',
    subheadline: 'Figures & Collectibles',
    description: 'New anime figures, dragon models, and game characters just added. Don\'t miss out!',
    coupon: 'NEW15',
    discount: '15% OFF',
    cta: 'Explore New Arrivals',
    href: '/products?category=figures-models',
    accent: '#0e7490',
    accentLight: '#e0f2f9',
    // accent: '#7c3aed',
    // accentLight: '#f3eeff',
    tag1: 'New stock weekly',
    tag2: 'Limited quantities',
  },
];

// Pick a random offer each session
const OFFER = OFFERS[Math.floor(Math.random() * OFFERS.length)];

// ── Helper: check if snooze has expired ──────────────────────
function shouldShow(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const expiry = parseInt(raw, 10);
    return Date.now() > expiry;
  } catch {
    return true;
  }
}

function dismissFor(days: number) {
  try {
    const expiry = Date.now() + days * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, String(expiry));
  } catch { }
}

// ── Coupon copy state ─────────────────────────────────────────
function CouponChip({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      title="Click to copy coupon code"
      className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-all w-full justify-center"
      style={{
        borderColor: OFFER.accent,
        backgroundColor: OFFER.accentLight,
        color: OFFER.accent,
      }}
    >
      <Tag className="w-4 h-4 shrink-0" />
      <span className="font-mono font-bold tracking-widest text-sm">{code}</span>
      <span
        className="ml-auto text-xs font-semibold px-2 py-0.5 rounded text-white transition-all"
        style={{ backgroundColor: copied ? '#16a34a' : OFFER.accent }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </span>
    </button>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════
export function AdBanner() {
  const [visible, setVisible] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const [countdown, setCountdown] = useState(AUTO_CLOSE_SEC);

  // ── Show logic ───────────────────────────────────────────
  useEffect(() => {
    if (!shouldShow()) return;
    const t = setTimeout(() => {
      setVisible(true);
      // Small tick so CSS transition triggers after mount
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // ── Countdown auto-close ─────────────────────────────────
  useEffect(() => {
    if (!visible) return;
    if (countdown <= 0) { handleClose(); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [visible, countdown]);

  // ── Escape key ───────────────────────────────────────────
  const handleClose = useCallback(() => {
    setAnimIn(false);
    setTimeout(() => setVisible(false), 280);
  }, []);

  const handleDontShow = useCallback(() => {
    dismissFor(SNOOZE_DAYS);
    handleClose();
  }, [handleClose]);

  useEffect(() => {
    if (!visible) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [visible, handleClose]);

  // ── Body scroll lock ─────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  if (!visible) return null;

  const pct = AUTO_CLOSE_SEC > 0 ? (countdown / AUTO_CLOSE_SEC) * 100 : 100;

  return (
    <>
      {/* ── Backdrop ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className="fixed inset-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(3px)',
          opacity: animIn ? 1 : 0,
        }}
      />

      {/* ── Modal ──────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Special offer"
        className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
      >
        <div
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
          style={{
            transform: animIn ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(24px)',
            opacity: animIn ? 1 : 0,
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease',
          }}
        >
          {/* ── Countdown progress bar (top) ─────────── */}
          {AUTO_CLOSE_SEC > 0 && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-10">
              <div
                className="h-full transition-all duration-1000 ease-linear"
                style={{ width: `${pct}%`, backgroundColor: OFFER.accent }}
              />
            </div>
          )}

          {/* ── Hero accent strip ────────────────────── */}
          <div
            className="relative px-6 pt-8 pb-6 text-white text-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${OFFER.accent} 0%, ${OFFER.accent}cc 100%)` }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10"
              aria-label="Close advertisement"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge */}
            <div className="relative inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-3">
              {OFFER.badge}
            </div>

            {/* Headline */}
            <h2
              className="font-display font-bold leading-tight mb-1"
              style={{ fontSize: 'clamp(2rem, 8vw, 2.75rem)' }}
            >
              {OFFER.headline}
            </h2>
            <p className="text-white/80 text-sm font-medium">{OFFER.subheadline}</p>

            {/* Discount pill */}
            <div className="inline-flex items-center gap-2 mt-4 bg-white text-sm font-extrabold px-5 py-2 rounded-full shadow-lg"
              style={{ color: OFFER.accent }}>
              <Zap className="w-4 h-4" />
              {OFFER.discount}
            </div>
          </div>

          {/* ── Body ─────────────────────────────────── */}
          <div className="px-6 py-5 space-y-4">
            {/* Description */}
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {OFFER.description}
            </p>

            {/* Coupon */}
            <div className="space-y-1.5">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 text-center">
                Use Coupon Code
              </p>
              <CouponChip code={OFFER.coupon} />
            </div>

            {/* Tags row */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {[OFFER.tag1, OFFER.tag2].map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: OFFER.accent }} />
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={OFFER.href}
              onClick={handleClose}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white rounded-xl transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: OFFER.accent }}
            >
              {OFFER.cta}
              <ChevronRight className="w-4 h-4" />
            </Link>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
              <button
                onClick={handleDontShow}
                className="hover:text-gray-600 transition-colors underline underline-offset-2"
              >
                Don't show for {SNOOZE_DAYS} days
              </button>

              {AUTO_CLOSE_SEC > 0 && countdown > 0 && (
                <div className="flex items-center gap-1" style={{ color: OFFER.accent }}>
                  <Clock className="w-3 h-3" />
                  <span className="font-mono font-semibold">Closes in {countdown}s</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Phone } from 'lucide-react';
import { categories } from '@/lib/mockData';

export function SecondaryNav() {
  const [catOpen, setCatOpen] = useState(false);

  return (
    <nav
      className="bg-stone-100 border-b border-stone-200 relative z-40"
      aria-label="Secondary navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Left: nav links */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            <Link
              href="/"
              className="shrink-0 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-brand-600 transition-colors tracking-wide uppercase"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="shrink-0 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-brand-600 transition-colors tracking-wide uppercase"
            >
              Shop
            </Link>

            {/* Categories dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-brand-600 transition-colors tracking-wide uppercase"
                aria-expanded={catOpen}
                aria-haspopup="true"
              >
                Categories <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>

              {catOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0" onClick={() => setCatOpen(false)} />
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-stone-200 shadow-lg py-1 animate-slide-up">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.slug}`}
                        className="block px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-brand-600 transition-colors"
                        onClick={() => setCatOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Category quick links — visible on md+ */}
            <div className="hidden lg:flex items-center gap-0">
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className="px-3 py-1.5 text-xs text-stone-500 hover:text-brand-600 transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: phone */}
          <a
            href="tel:+8801700000000"
            className="shrink-0 flex items-center gap-1.5 text-xs text-stone-600 hover:text-brand-600 transition-colors font-medium"
            aria-label="Call us at +880 1700 000000"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+880 1700 000000</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

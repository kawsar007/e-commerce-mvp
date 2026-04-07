'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, X, Package } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore((s) => s.getTotalItems());
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery);
      // Future: router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-stone-950 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <Package className="w-6 h-6 text-brand-400 transition-transform group-hover:rotate-12" />
            <span className="font-display text-xl font-semibold tracking-wide text-white">
              Print<span className="text-brand-400">Craft</span>
            </span>
          </Link>

          {/* Search — desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md relative"
            role="search"
          >
            <input
              ref={inputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="w-full bg-stone-800 text-white placeholder:text-stone-400 text-sm px-4 py-2.5 pl-10 focus:outline-none focus:ring-1 focus:ring-brand-400 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="#"
              className="hidden md:flex items-center gap-1.5 text-sm text-stone-300 hover:text-white transition-colors px-3 py-2"
              aria-label="Login"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
            <Link
              href="#"
              className="hidden md:block text-sm bg-brand-600 hover:bg-brand-500 px-4 py-2 text-white font-medium transition-colors"
              aria-label="Register"
            >
              Register
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 text-stone-300 hover:text-white transition-colors"
              aria-label={`Cart with ${totalItems} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-brand-500 text-white text-[10px] font-bold rounded-full px-1 animate-slide-in-right">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-stone-300 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search + menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-stone-800 py-4 space-y-4 animate-slide-up">
            <form onSubmit={handleSearch} className="relative" role="search">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
                className="w-full bg-stone-800 text-white placeholder:text-stone-400 text-sm px-4 py-2.5 pl-10 focus:outline-none focus:ring-1 focus:ring-brand-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            </form>
            <div className="flex gap-3">
              <Link href="#" className="flex-1 btn-ghost border border-stone-700 justify-center py-2.5 text-stone-300">
                <User className="w-4 h-4" /> Login
              </Link>
              <Link href="#" className="flex-1 btn-primary justify-center py-2.5">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

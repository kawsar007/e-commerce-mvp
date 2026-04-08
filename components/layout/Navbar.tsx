'use client';

import { useCartStore } from '@/store/cartStore';
import { Menu, Package, Search, ShoppingCart, User, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore((s) => s.getTotalItems());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) console.log('Search:', searchQuery);
  };

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <Package className="w-7 h-7 transition-transform group-hover:rotate-12" style={{ color: '#0e7490' }} />
            <span className="font-display text-2xl font-bold tracking-tight text-gray-800">
              Print<span style={{ color: '#0e7490' }}>Craft</span>
              <span className="text-gray-400 text-sm font-sans font-normal">.com</span>
            </span>
          </Link>

          {/* Search bar — desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl"
            role="search"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="flex-1 border-2 border-gray-300 rounded-l-lg border-r-0 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0e7490]"
            />
            <button
              type="submit"
              className="rounded-r-lg flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold shrink-0"
              style={{ backgroundColor: '#0e7490' }}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Right: Login/Register + Cart */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Login / Register — desktop */}
            <div className="hidden md:flex items-center gap-1">
              <span className="mr-2 border rounded-full p-2 bg-gray-100">
                <User className="w-5 h-5 text-gray-500" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-[12px] text-gray-400">Hello, Sign In</span>
                <Link
                  href="#"
                  className="text-sm font-semibold text-gray-800 hover:text-[#0e7490] transition-colors"
                >
                  Login / Register
                </Link>
              </div>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10"
              aria-label={`Cart with ${totalItems} items`}
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#0e7490] transition-colors" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-white text-[10px] font-bold rounded-full px-1"
                  style={{ backgroundColor: '#e11d48' }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile: search + links */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex" role="search">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="flex-1 border border-gray-300 border-r-0 px-4 py-2.5 text-sm focus:outline-none focus:border-[#0e7490]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-white text-sm font-semibold"
                style={{ backgroundColor: '#0e7490' }}
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
            <div className="flex gap-3">
              <Link href="#" className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 text-sm text-gray-700 font-medium hover:border-[#0e7490] hover:text-[#0e7490] transition-colors">
                <User className="w-4 h-4" /> Login
              </Link>
              <Link href="#" className="flex-1 flex items-center justify-center py-2.5 text-sm text-white font-semibold" style={{ backgroundColor: '#0e7490' }}>
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
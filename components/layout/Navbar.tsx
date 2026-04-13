'use client';

import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { ChevronDown, LogOut, Menu, Package, Search, ShoppingCart, User, UserCircle, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const dropRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const totalItems = useCartStore((s) => s.getTotalItems());
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) console.log('Search:', searchQuery);
  };

  const handleLogout = () => {
    logout();
    router.push('/'); // Redirect to home after logout
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

            {isAuthenticated && user ? (
              /* Logged-in: user dropdown */
              <div className="hidden md:block relative" ref={dropRef}>
                <button
                  onClick={() => setUserDropOpen((o) => !o)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-[#0e7490] transition-colors"
                  aria-expanded={userDropOpen}
                  aria-haspopup="true"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: '#0e7490' }}
                    aria-hidden="true"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col leading-none text-left">
                    <span className="text-[10px] text-gray-400">Hello,</span>
                    <span className="text-sm font-semibold text-gray-800 max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${userDropOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {userDropOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 shadow-lg py-1 z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                    </div>
                    <Link
                      href="#"
                      onClick={() => setUserDropOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0e7490] transition-colors"
                    >
                      <UserCircle className="w-4 h-4" /> My Profile
                    </Link>
                    <Link
                      href="/cart"
                      onClick={() => setUserDropOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0e7490] transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" /> My Orders
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in */
              <div className="hidden md:flex items-center gap-1">
                <User className="w-5 h-5 text-gray-500" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] text-gray-400">Hello, Sign In</span>
                  <Link
                    href="/auth/login"
                    className="text-sm font-semibold text-gray-800 hover:text-[#0e7490] transition-colors"
                  >
                    Login / Register
                  </Link>
                </div>
              </div>
            )}


            {/* Cart */}
            <button
              onClick={openDrawer}
              // href="/cart"

              className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10"
              aria-label={
                hasHydrated
                  ? `Open cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`
                  : 'Open cart'
              }
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#0e7490] transition-colors" />
              {hasHydrated && totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-white text-[10px] font-bold rounded-full px-1"
                  style={{ backgroundColor: '#e11d48' }}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>


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

        {/* ════════════════════════════════════════════════════
          MOBILE SLIDE-DOWN MENU
          Full-screen overlay with search, nav links, auth
          ════════════════════════════════════════════════════ */}
        {/* Backdrop */}
        {menuOpen && (
          <div
            className="fixed inset-0 top-16 bg-black/40 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Panel */}
        <div
          ref={mobileRef}
          className="md:hidden fixed left-0 right-0 top-16 z-40 bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ease-in-out overflow-y-auto"
          style={{
            maxHeight: menuOpen ? 'calc(100vh - 64px)' : '0',
            overflow: menuOpen ? 'auto' : 'hidden',
          }}
          aria-hidden={!menuOpen}
        >
          <div className="px-4 py-5 space-y-5">

            {/* Search */}
            <form onSubmit={(e) => { handleSearch(e); setMenuOpen(false); }} className="flex" role="search">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="flex-1 border border-gray-300 border-r-0 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0e7490]"
              />
              <button
                type="submit"
                className="px-4 py-3 text-white font-semibold"
                style={{ backgroundColor: '#0e7490' }}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Nav links */}
            {/* <nav aria-label="Mobile navigation">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Shop All', href: '/products' },
                  { label: 'Home Decor', href: '/products?category=home-decor' },
                  { label: 'Planters', href: '/products?category=planters-pots' },
                  { label: 'Lamps', href: '/products?category=lamps-lighting' },
                  { label: 'Figures', href: '/products?category=figures-models' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-[#0e7490] hover:text-white transition-colors rounded"
                  >
                    <LayoutGrid className="w-3.5 h-3.5 opacity-60" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav> */}

            <div className="border-t border-gray-100" />

            {/* ── Auth section in mobile menu ──────────────── */}
            {isAuthenticated && user ? (
              /* Logged in */
              <div className="space-y-3">
                {/* User card */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-bold shrink-0"
                    style={{ backgroundColor: '#0e7490' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    {user.phone && <p className="text-xs text-gray-400">{user.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-sm text-gray-700 font-medium hover:border-[#0e7490] hover:text-[#0e7490] transition-colors rounded"
                  >
                    <UserCircle className="w-4 h-4" /> My Profile
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-sm text-gray-700 font-medium hover:border-[#0e7490] hover:text-[#0e7490] transition-colors rounded"
                  >
                    <ShoppingCart className="w-4 h-4" /> My Orders
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-red-200 bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors rounded"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              /* Not logged in */
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 text-center">
                  Your Account
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3.5 border-2 text-sm font-semibold transition-colors rounded"
                    style={{ borderColor: '#0e7490', color: '#0e7490' }}
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 rounded"
                    style={{ backgroundColor: '#0e7490' }}
                  >
                    <UserCircle className="w-4 h-4" />
                    Register
                  </Link>
                </div>
                <p className="text-xs text-center text-gray-400">
                  New here?{' '}
                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="font-semibold underline"
                    style={{ color: '#0e7490' }}
                  >
                    Create a free account
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
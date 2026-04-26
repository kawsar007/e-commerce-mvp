'use client';

import { categories } from '@/lib/mockData';
import { ChevronDown, LayoutGrid, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function SecondaryNav() {
  const [catOpen, setCatOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white" style={{ position: 'sticky', top: '64px', zIndex: 40 }} aria-label="Secondary navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-stretch h-11">

          {/* Categories button — teal pill matching reference */}
          <div className="relative flex items-stretch">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-2 px-5 text-white text-sm font-semibold h-full shrink-0"
              style={{ backgroundColor: '#0e7490' }}
              aria-expanded={catOpen}
              aria-haspopup="true"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline tracking-wide uppercase text-xs font-bold">Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
            </button>

            {catOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setCatOpen(false)} />
                <div className="absolute top-full left-0 w-56 bg-white border border-gray-200 shadow-lg py-1 z-20">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      style={{ borderLeft: '3px solid transparent' }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = '#0e7490')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = 'transparent')}
                      onClick={() => setCatOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Separator */}
          <div className="w-px bg-gray-200 mr-1" />

          {/* Nav links */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1">
            {[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/products' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#0e7490] transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}

            {/* Quick category pills — lg screens */}
            <div className="hidden lg:flex items-center gap-0">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className="px-3 py-2 text-xs text-gray-500 hover:text-[#0e7490] transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Phone — right side, red like reference */}
          <a
            href="tel:+8801638600627"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold shrink-0 pl-4"
            style={{ color: '#e11d48' }}
            aria-label="Call us"
          >
            <Phone className="w-4 h-4" />
            <span>+8801638600627</span>
          </a>
        </div>
      </div>
    </nav>
  );
}



// 'use client';

// import { categories } from '@/lib/mockData';
// import { ChevronDown, LayoutGrid, Phone } from 'lucide-react';
// import Link from 'next/link';

// export function SecondaryNav() {
//   return (
//     <nav className="border-b border-gray-200 bg-white" style={{ position: 'sticky', top: '64px', zIndex: 40 }} aria-label="Secondary navigation">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-stretch h-11">

//           {/* Categories button — now opens on HOVER */}
//           <div className="relative flex items-stretch group">   {/* ← group added here */}
//             <button
//               className="flex items-center gap-2 px-5 text-white text-sm font-semibold h-full shrink-0"
//               style={{ backgroundColor: '#0e7490' }}
//               aria-haspopup="true"
//             >
//               <LayoutGrid className="w-4 h-4" />
//               <span className="hidden sm:inline tracking-wide uppercase text-xs font-bold">Categories</span>
//               <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />   {/* ← now uses group-hover */}
//             </button>

//             {/* Dropdown — opens on hover (no more click state) */}
//             <div className="absolute top-full left-0 w-56 bg-white border border-gray-200 shadow-lg py-1 z-20 hidden group-hover:block">
//               {categories.map((cat) => (
//                 <Link
//                   key={cat.id}
//                   href={`/products?category=${cat.slug}`}
//                   className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                   style={{ borderLeft: '3px solid transparent' }}
//                   onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = '#0e7490')}
//                   onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = 'transparent')}
//                 >
//                   {cat.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Separator */}
//           <div className="w-px bg-gray-200 mr-1" />

//           {/* Nav links */}
//           <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1">
//             {[
//               { label: 'Home', href: '/' },
//               { label: 'Shop', href: '/products' },
//             ].map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#0e7490] transition-colors whitespace-nowrap"
//               >
//                 {item.label}
//               </Link>
//             ))}

//             {/* Quick category pills — lg screens */}
//             <div className="hidden lg:flex items-center gap-0">
//               {categories.map((cat) => (
//                 <Link
//                   key={cat.id}
//                   href={`/products?category=${cat.slug}`}
//                   className="px-3 py-2 text-xs text-gray-500 hover:text-[#0e7490] transition-colors whitespace-nowrap"
//                 >
//                   {cat.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Phone — right side, red like reference */}
//           <a
//             href="tel:+8801751704061"
//             className="hidden sm:flex items-center gap-1.5 text-sm font-semibold shrink-0 pl-4"
//             style={{ color: '#e11d48' }}
//             aria-label="Call us"
//           >
//             <Phone className="w-4 h-4" />
//             <span>+8801751704061</span>
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// }

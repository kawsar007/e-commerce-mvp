'use client';

import { formatPrice, getProductImage } from '@/lib/mockData';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';
import { Eye, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const imgSrc = getProductImage(product.images[0], product.slug);

  return (
    <article
      className={`product-card group ${className}`}
      aria-label={product.name}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-stone-100 aspect-square">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Quick view — unchanged */}
        <Link
          href={`/products/${product.id}`}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 bg-white text-stone-800 text-xs font-medium px-4 py-2 shadow-md hover:bg-stone-50 whitespace-nowrap"
          aria-label={`View details for ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </Link>
      </div>

      {/* Info — dark card style matching reference */}
      <div className="p-4">
        <Link href={`/products/${product.id}`} className="group/link">
          <h3
            className="text-black text-center font-bold uppercase tracking-wide leading-snug mb-2 line-clamp-2 group-hover/link:text-orange-400 transition-colors"
            style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)' }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p className="text-black text-center font-semibold text-sm mb-3">
          {formatPrice(product.price)}
        </p>

        {/* Full-width Add to Cart */}
        <button
          onClick={() => addItem(product)}
          className="w-full flex items-center justify-center gap-2 text-white text-xs font-bold uppercase tracking-widest py-2.5 transition-opacity hover:opacity-90 active:scale-95"
          // style={{ backgroundColor: '#e85d04' }}
          style={{ backgroundColor: '#0e7490' }}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}




// 'use client';

// import { formatPrice, getProductImage } from '@/lib/mockData';
// import { useCartStore } from '@/store/cartStore';
// import type { Product } from '@/types';
// import { Eye, ShoppingCart } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';

// interface ProductCardProps {
//   product: Product;
//   className?: string;
// }

// export function ProductCard({ product, className = '' }: ProductCardProps) {
//   const addItem = useCartStore((s) => s.addItem);

//   const imgSrc = getProductImage(product.images[0], product.slug);

//   return (
//     <article
//       className={`product-card group ${className}`}
//       aria-label={product.name}
//     >
//       {/* Image */}
//       <div className="relative overflow-hidden bg-stone-100 aspect-square">
//         <Image
//           src={imgSrc}
//           alt={product.name}
//           fill
//           sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//           className="object-cover transition-transform duration-500 group-hover:scale-105"
//           unoptimized
//         />

//         {/* Hover overlay */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

//         {/* Quick view */}
//         <Link
//           href={`/products/${product.id}`}
//           className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 bg-white text-stone-800 text-xs font-medium px-4 py-2 shadow-md hover:bg-stone-50 whitespace-nowrap"
//           aria-label={`View details for ${product.name}`}
//         >
//           <Eye className="w-3.5 h-3.5" /> Quick View
//         </Link>
//       </div>

//       {/* Info */}
//       <div className="p-4">
//         <Link href={`/products/${product.id}`} className="group/link">
//           <h3 className="text-sm font-medium text-stone-800 group-hover/link:text-brand-600 transition-colors leading-snug mb-1 line-clamp-2">
//             {product.name}
//           </h3>
//         </Link>
//         <p className="text-xs text-stone-400 mb-3 line-clamp-1">{product.shortDescription}</p>

//         <div className="flex items-center justify-between gap-2">
//           <span className="font-display text-lg font-semibold text-brand-600">
//             {formatPrice(product.price)}
//           </span>
//           <button
//             onClick={() => addItem(product)}
//             className="flex items-center gap-1.5 bg-stone-900 hover:bg-brand-600 text-white text-xs font-medium px-3 py-2 transition-colors"
//             aria-label={`Add ${product.name} to cart`}
//           >
//             <ShoppingCart className="w-3.5 h-3.5" />
//             <span className="hidden sm:inline">Add</span>
//           </button>
//         </div>
//       </div>
//     </article>
//   );
// }

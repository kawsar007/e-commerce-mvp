import { categories } from '@/lib/mockData';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const catImageMap: Record<string, string> = {
  cat_1: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
  cat_2: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
  cat_3: 'https://plus.unsplash.com/premium_photo-1684795780266-ecd819f04f96?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  cat_4: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
  cat_5: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&q=80',
};

export function CategoriesSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="categories-heading">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-brand-600 font-medium mb-2">Browse By</p>
          <h2 id="categories-heading" className="section-title">
            Item Categories
          </h2>
        </div>
        <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-sm text-stone-500 hover:text-brand-600 transition-colors font-medium">
          All Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          // 👇 wrapper is now a flex column so label sits below image
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="group flex flex-col"
            aria-label={`Browse ${cat.name}`}
          >
            {/* Image container — aspect ratio unchanged */}
            <div className="relative overflow-hidden bg-stone-200 aspect-[3/4]">
              <Image
                src={catImageMap[cat.id]}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
              />
              {/* subtle overlay on hover only */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* 👇 Label below image — matches reference: uppercase, bold, centered */}
            <div className="pt-3 pb-1 text-center">
              <p className="text-stone-900 font-bold text-base uppercase tracking-widest leading-snug group-hover:text-brand-600 transition-colors duration-200">
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}


// import { categories } from '@/lib/mockData';
// import { ArrowRight } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';

// const catImageMap: Record<string, string> = {
//   cat_1: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
//   cat_2: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
//   cat_3: 'https://plus.unsplash.com/premium_photo-1684795780266-ecd819f04f96?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   cat_4: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
//   cat_5: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&q=80',
// };

// export function CategoriesSection() {
//   return (
//     <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="categories-heading">
//       <div className="flex items-end justify-between mb-10">
//         <div>
//           <p className="text-xs tracking-[0.25em] uppercase text-brand-600 font-medium mb-2">Browse By</p>
//           <h2 id="categories-heading" className="section-title">
//             Item Categories
//           </h2>
//         </div>
//         <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-sm text-stone-500 hover:text-brand-600 transition-colors font-medium">
//           All Products <ArrowRight className="w-4 h-4" />
//         </Link>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//         {categories.map((cat) => (
//           <Link
//             key={cat.id}
//             href={`/products?category=${cat.slug}`}
//             className="group relative overflow-hidden bg-stone-200 aspect-[3/4] block"
//             aria-label={`Browse ${cat.name}`}
//           >
//             <Image
//               src={catImageMap[cat.id]}
//               alt={cat.name}
//               fill
//               sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
//               className="object-cover transition-transform duration-500 group-hover:scale-110"
//               unoptimized
//             />
//             {/* Gradient */}
//             <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

//             {/* Label */}
//             <div className="absolute bottom-0 left-0 right-0 p-4">
//               <p className="text-white font-medium text-sm leading-snug">{cat.name}</p>
//               <p className="text-brand-300 text-xs mt-0.5 flex items-center gap-1 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
//                 Shop now <ArrowRight className="w-3 h-3" />
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }

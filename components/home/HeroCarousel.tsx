'use client';

import { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroSlide } from '@/types';

const slides: HeroSlide[] = [
  {
    id: 1,
    headline: 'Objects Worth Owning',
    subheadline: 'Precision-crafted 3D printed decor for homes that tell a story.',
    cta: 'Shop Collection',
    bg: 'from-stone-950 to-stone-800',
    accent: 'text-brand-400',
  },
  {
    id: 2,
    headline: 'Bring Nature Indoors',
    subheadline: 'Geometric planters and modern pots for every corner of your space.',
    cta: 'Explore Planters',
    bg: 'from-stone-800 to-stone-950',
    accent: 'text-emerald-400',
  },
  {
    id: 3,
    headline: 'Light Up Your World',
    subheadline: 'Moon lamps, galaxy projectors, and spiral lights to set the mood.',
    cta: 'Shop Lamps',
    bg: 'from-indigo-950 to-stone-950',
    accent: 'text-indigo-300',
  },
  {
    id: 4,
    headline: 'Collect. Display. Love.',
    subheadline: 'Anime figures, fantasy models and game characters for true collectors.',
    cta: 'View Figures',
    bg: 'from-rose-950 to-stone-950',
    accent: 'text-rose-400',
  },
];

// Background patterns for each slide
const patterns = [
  "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M0 0h4v4H0V0zm24 0h4v4h-4V0zm48 0h4v4h-4V0zm-12 8h4v4h-4V8zm-12 0h4v4h-4V8zM0 8h4v4H0V8zm12-8h4v4h-4V0zm24 8h4v4h-4V8zm-12 8h4v4h-4v-4zM0 16h4v4H0v-4zm48 0h4v4h-4v-4zm12-16h4v4h-4V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="embla relative" aria-label="Hero carousel">
      <div className="embla__container" ref={emblaRef}>
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`embla__slide bg-gradient-to-br ${slide.bg} relative overflow-hidden`}
            style={{ minHeight: 'min(520px, 70vw)' }}
          >
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-60"
              style={{ backgroundImage: `url("${patterns[idx]}")` }}
            />

            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white opacity-[0.02]" />
            <div className="absolute -left-10 -bottom-20 w-72 h-72 rounded-full bg-white opacity-[0.03]" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center" style={{ minHeight: 'inherit' }}>
              <div className="max-w-2xl py-16 md:py-24">
                <p className={`text-xs tracking-[0.3em] uppercase font-medium mb-4 ${slide.accent}`}>
                  3D Printed · Made in Bangladesh
                </p>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6">
                  {slide.headline}
                </h1>
                <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                  {slide.subheadline}
                </p>
                <Link href="/products" className="btn-primary text-base px-8 py-4">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}

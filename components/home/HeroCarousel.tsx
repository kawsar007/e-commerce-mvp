'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85',
    headline: 'Think & Build',
    subheadline: 'Precision-crafted 3D printed decor for homes that tell a story.',
    cta: 'Shop Now',
    href: '/products',
    position: 'left',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1600&q=85',
    headline: 'Bring Nature Indoors',
    subheadline: 'Geometric planters and modern pots for every corner of your space.',
    cta: 'Shop Now',
    href: '/products?category=planters-pots',
    position: 'left',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1773332611522-06b86b48cbf1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    headline: 'Light Up Your World',
    subheadline: 'Moon lamps, galaxy projectors, and spiral lights to set the mood.',
    cta: 'Shop Now',
    href: '/products?category=lamps-lighting',
    position: 'left',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1600&q=85',
    headline: 'Collect & Display',
    subheadline: 'Anime figures, fantasy models and game characters for true collectors.',
    cta: 'Shop Now',
    href: '/products?category=figures-models',
    position: 'left',
  },
];

export function HeroCarousel() {
  const SLIDE_HEIGHT = 'clamp(320px, 55vw, 580px)';

  // Stabilized autoplay (prevents recreation on re-renders)
  const autoplay = useRef(
    Autoplay({
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  ).current;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 30,
    },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect(); // initial call

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      className="embla relative w-full"
      aria-label="Hero carousel"
      style={{ height: SLIDE_HEIGHT }}
    >
      {/* VIEWPORT */}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="embla__slide relative overflow-hidden"
              style={{ height: SLIDE_HEIGHT }}
            >
              {/* Fallback background while image loads */}
              <div className="absolute inset-0 bg-stone-800" />

              {/* Optimized Next.js Image */}
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                className="absolute inset-0 w-full h-full object-cover"
                priority={slide.id === 1}           // Only first slide is critical
                sizes="100vw"                       // Full viewport width
                quality={85}
                placeholder="blur"                  // Optional nice blur effect
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCg=="
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-xl">
                    <h1
                      className="text-white font-bold leading-tight mb-4"
                      style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                    >
                      {slide.headline}
                    </h1>
                    <p
                      className="text-gray-200 mb-8 leading-relaxed"
                      style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
                    >
                      {slide.subheadline}
                    </p>
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-95 btn-primary"
                    >
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === selectedIndex ? '24px' : '8px',
              height: '8px',
              backgroundColor: i === selectedIndex ? '#0e7490' : 'rgba(255,255,255,0.6)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
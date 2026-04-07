import { Facebook, Instagram, Mail, MapPin, Package, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Package className="w-6 h-6 text-brand-400" />
              <span className="font-display text-xl font-semibold text-white">
                Print<span className="text-brand-400">Craft</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Premium 3D printed home decor, planters, lamps, and collectible figures — crafted with precision in Bangladesh.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center border border-stone-700 text-stone-400 hover:border-brand-500 hover:text-brand-400 transition-colors"
                  aria-label="Social media"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {['Home Decor', 'Planters & Pots', 'Lamps & Lighting', 'Desk Accessories', 'Figures & Models'].map((item) => (
                <li key={item}>
                  <Link href="/products" className="text-sm hover:text-brand-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-4">Information</h3>
            <ul className="space-y-2.5">
              {['About Us', 'FAQ', 'Shipping Policy', 'Return Policy', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm hover:text-brand-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+8801700000000" className="flex items-start gap-2.5 text-sm hover:text-brand-400 transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" /> +880 1700 000000
                </a>
              </li>
              <li>
                <a href="mailto:hello@printcraft.com.bd" className="flex items-start gap-2.5 text-sm hover:text-brand-400 transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" /> hello@printcraft.com.bd
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-400" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>

            {/* Payment mock icons */}
            <div className="mt-6">
              <p className="text-xs tracking-widest uppercase text-white mb-3">We Accept</p>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFhRcR9ClYHOrFtimuZIXTZvgU31TQ_nrBg&s', alt: 'bKash' },
                  { src: 'https://nagad.com.bd//_nuxt/img/og-image.6e48f4e.jpeg', alt: 'Nagad' },
                  { src: 'https://static.vecteezy.com/system/resources/thumbnails/068/706/013/small_2x/rocket-color-logo-mobile-banking-icon-free-png.png', alt: 'VISA' },
                  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNgW6FaeEe3QP2NMKcry5tSEINxi2Slv8og&s', alt: 'MasterCard' },
                ].map((payment) => (
                  <Image
                    key={payment.alt}
                    src={payment.src}
                    alt={payment.alt}
                    width={48}
                    height={28}
                    className="rounded-sm object-contain bg-stone-900"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <p>© {new Date().getFullYear()} PrintCraft. All rights reserved.</p>
          <p>Designed & Developed by Kawsar</p>
        </div>
      </div>
    </footer>
  );
}

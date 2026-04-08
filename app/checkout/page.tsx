'use client';

import { formatPrice, getProductImage } from '@/lib/mockData';
import { useCartStore } from '@/store/cartStore';
import type { CheckoutForm } from '@/types';
import { ArrowLeft, CheckCircle, Package, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const emptyForm: CheckoutForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  district: '',
  notes: '',
};

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<CheckoutForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [ordered, setOrdered] = useState(false);
  const [orderNumber] = useState(() => `PC-${Date.now().toString().slice(-6)}`);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 2000 ? 0 : 120;
  const total = subtotal + shipping;

  const validate = (): boolean => {
    const errs: Partial<CheckoutForm> = {};
    if (!form.firstName.trim()) errs.firstName = 'Required';
    if (!form.lastName.trim()) errs.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.length < 11) errs.phone = 'Valid phone required';
    if (!form.address.trim()) errs.address = 'Required';
    if (!form.city.trim()) errs.city = 'Required';
    if (!form.district.trim()) errs.district = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setOrdered(true);
    clearCart();
  };

  // Order confirmed state
  if (ordered) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="bg-white p-10 shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-light text-stone-900 mb-2">Order Placed!</h1>
          <p className="text-stone-500 mb-6">Thank you, {form.firstName}! Your order has been received.</p>

          <div className="bg-stone-50 p-4 text-left space-y-2 mb-8 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Order Number</span>
              <span className="font-semibold text-stone-800">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Delivery To</span>
              <span className="text-stone-800">{form.address}, {form.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Estimated Delivery</span>
              <span className="text-stone-800">3–5 Business Days</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-stone-500 mb-8">
            <Truck className="w-4 h-4" />
            <span>A confirmation will be sent to <strong>{form.email}</strong></span>
          </div>

          <Link href="/products" className="btn-primary px-10 py-3.5">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <Package className="w-16 h-16 mx-auto text-stone-300 mb-6" />
        <h1 className="font-display text-3xl font-light text-stone-800 mb-3">Nothing to checkout</h1>
        <Link href="/products" className="btn-primary px-10 py-4">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/cart" className="text-stone-400 hover:text-stone-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-light text-stone-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form — 3 cols */}
        <form onSubmit={handleSubmit} noValidate className="lg:col-span-3 space-y-6">
          {/* Contact */}
          <section className="bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-stone-600 pb-3 border-b border-stone-100">
              Contact Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value={form.firstName}
                  onChange={handleChange} className="input-field" placeholder="Rahim" />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="label" htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={form.lastName}
                  onChange={handleChange} className="input-field" placeholder="Uddin" />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="label" htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" value={form.email}
                onChange={handleChange} className="input-field" placeholder="you@example.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="label" htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" value={form.phone}
                onChange={handleChange} className="input-field" placeholder="01700000000" />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
          </section>

          {/* Shipping */}
          <section className="bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-stone-600 pb-3 border-b border-stone-100">
              Shipping Address
            </h2>
            <div>
              <label className="label" htmlFor="address">Street Address</label>
              <input id="address" name="address" type="text" value={form.address}
                onChange={handleChange} className="input-field" placeholder="House 12, Road 5, Dhanmondi" />
              {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="city">City</label>
                <input id="city" name="city" type="text" value={form.city}
                  onChange={handleChange} className="input-field" placeholder="Dhaka" />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="label" htmlFor="district">District</label>
                <select id="district" name="district" value={form.district}
                  onChange={handleChange} className="input-field">
                  <option value="">Select district…</option>
                  {['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Mymensingh', 'Rangpur'].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
              </div>
            </div>
            <div>
              <label className="label" htmlFor="notes">Order Notes (optional)</label>
              <textarea id="notes" name="notes" value={form.notes} onChange={handleChange}
                className="input-field resize-none" rows={3}
                placeholder="Any special instructions for your order…" />
            </div>
          </section>

          <button type="submit" className="btn-primary w-full py-4 text-base justify-center">
            Place Order · {formatPrice(total)}
          </button>

          <p className="text-xs text-center text-stone-400">
            By placing your order you agree to our{' '}
            <Link href="#" className="underline hover:text-stone-600">Terms of Service</Link> and{' '}
            <Link href="#" className="underline hover:text-stone-600">Privacy Policy</Link>.
          </p>
        </form>

        {/* Order summary — 2 cols */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-stone-600 mb-4">Your Order</h2>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  <div className="relative w-14 h-14 shrink-0 bg-stone-100 overflow-hidden">
                    <Image
                      src={getProductImage(product.images[0], product.slug)}
                      alt={product.name}
                      fill className="object-cover" unoptimized
                    />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-800 leading-snug truncate">{product.name}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{formatPrice(product.price)} × {quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-stone-800 shrink-0">{formatPrice(product.price * quantity)}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-stone-200 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-semibold text-stone-900 pt-2 border-t border-stone-200 text-base">
                <span>Total</span>
                <span className="text-sm font-semibold text-stone-800 shrink-0">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-stone-50 p-4 text-xs text-stone-500 space-y-1.5">
            <p className="font-semibold text-stone-700 text-sm mb-2">Payment Methods</p>
            <p>💳 Cash on Delivery</p>
            <p>📱 bKash / Nagad (after confirmation)</p>
            <p>🏦 Bank Transfer (for bulk orders)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

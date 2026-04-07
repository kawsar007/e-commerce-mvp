// Product & Category types

export interface Dimensions {
  width: number;
  depth: number;
  height: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  categoryId: string;
  images: string[];
  dimensions: Dimensions;
  shortDescription: string;
  description: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Checkout form types
export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  notes: string;
}

// Hero slide type
export interface HeroSlide {
  id: number;
  headline: string;
  subheadline: string;
  cta: string;
  bg: string;
  accent: string;
}

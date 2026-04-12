// Authentication types
export interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  district: string;
  agreeToTerms: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;
export type LoginErrors = Partial<Record<keyof LoginForm, string>>;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (data: Omit<RegisterForm, 'confirmPassword' | 'agreeToTerms'>) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

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

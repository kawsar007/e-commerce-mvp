import type { CartState, Product } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Extend CartState with drawer UI state (not persisted)
interface CartStoreState extends CartState {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;

  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      addItem: (product: Product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: 'printcraft-cart',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

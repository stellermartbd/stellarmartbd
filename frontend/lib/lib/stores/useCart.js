import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item._id === product._id);
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }
      },
      removeFromCart: (productId) =>
        set({ items: get().items.filter((item) => item._id !== productId) }),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);

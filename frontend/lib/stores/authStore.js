import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      // লগইন ফাংশন
      login: (userData, token) => {
        set({ 
          user: userData, 
          token: token, 
          isAuthenticated: true,
          loading: false 
        });
      },

      // লগআউট ফাংশন
      logout: () => {
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
        // লোকাল স্টোরেজ ক্লিয়ার করতে চাইলে
        localStorage.removeItem('auth-storage');
      },

      // ইউজার আপডেট ফাংশন
      updateUser: (updatedData) => {
        set((state) => ({
          user: { ...state.user, ...updatedData }
        }));
      },

      setLoading: (status) => set({ loading: status }),
    }),
    {
      name: 'auth-storage', // ব্রাউজারের লোকাল স্টোরেজে এই নামে সেভ হবে
    }
  )
);

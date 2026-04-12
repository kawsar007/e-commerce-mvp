/**
 * authStore.ts
 * ─────────────
 * Zustand store for authentication state.
 * Uses localStorage persistence via the `persist` middleware.
 * No real backend — simulates async login/register with mock data.
 *
 * Mock credentials for testing:
 *   Email:    demo@printcraft.com
 *   Password: Demo@1234
 */

import type { AuthState, AuthUser } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Seeded mock user for demo login ──────────────────────────
const MOCK_USER: AuthUser & { password: string } = {
  id: 'usr_demo',
  name: 'Demo User',
  email: 'demo@printcraft.com',
  phone: '01700000000',
  address: 'House 12, Road 5, Dhanmondi',
  city: 'Dhaka',
  district: 'Dhaka',
  password: 'Demo@1234',
};

// In-memory "database" — new registrations are pushed here
const mockDB: Array<AuthUser & { password: string }> = [MOCK_USER];

// ── Simulate async network delay ─────────────────────────────
const delay = (ms = 600) => new Promise<void>((res) => setTimeout(res, ms));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // ── Login ────────────────────────────────────────────
      login: async (email, password) => {
        await delay();
        const found = mockDB.find(
          (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );
        if (!found) {
          return { ok: false, error: 'Invalid email or password.' };
        }
        const { password: _pw, ...user } = found;
        set({ user, isAuthenticated: true });
        return { ok: true };
      },

      // ── Register ─────────────────────────────────────────
      register: async (data) => {
        await delay();
        const exists = mockDB.some(
          (u) => u.email.toLowerCase() === data.email.toLowerCase()
        );
        if (exists) {
          return { ok: false, error: 'An account with this email already exists.' };
        }
        const newUser: AuthUser & { password: string } = {
          id: `usr_${Date.now()}`,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          district: data.district,
          password: data.password,
        };
        mockDB.push(newUser);
        const { password: _pw, ...user } = newUser;
        set({ user, isAuthenticated: true });
        return { ok: true };
      },

      // ── Logout ───────────────────────────────────────────
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'printcraft-auth',
      // Only persist the resolved user — never the password
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
    }
  )
);
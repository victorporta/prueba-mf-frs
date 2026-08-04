import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AuthUser = {
  id: string
  email: string
  name: string
}

type AuthStore = {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  setSession: (user: AuthUser, token: string) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setSession: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      clearSession: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'mf-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

import { create } from 'zustand'

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

const STORAGE_KEY = 'metrica-auth'

function readStoredSession(): Pick<AuthStore, 'user' | 'token'> {
  if (typeof window === 'undefined') {
    return { user: null, token: null }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { user: null, token: null }

    const parsed = JSON.parse(raw) as { user?: AuthUser; token?: string }
    if (!parsed.user || !parsed.token) return { user: null, token: null }

    return { user: parsed.user, token: parsed.token }
  } catch {
    return { user: null, token: null }
  }
}

function persistSession(user: AuthUser | null, token: string | null) {
  if (typeof window === 'undefined') return

  if (!user || !token) {
    window.localStorage.removeItem(STORAGE_KEY)
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
}

const initial = readStoredSession()

export const useAuthStore = create<AuthStore>((set) => ({
  user: initial.user,
  token: initial.token,
  isAuthenticated: Boolean(initial.user && initial.token),
  setSession: (user, token) => {
    persistSession(user, token)
    set({ user, token, isAuthenticated: true })
  },
  clearSession: () => {
    persistSession(null, null)
    set({ user: null, token: null, isAuthenticated: false })
  },
}))

import { create } from 'zustand'

import { AuthState } from '../types/auth'
import { decodeToken } from '../utils/decodeToken'

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),

  login: async (token) => {
    localStorage.setItem('token', token)
    const decoded = decodeToken(token)
    set({
      token,
      user: {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      },
    })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null })
  },

  setUser: (user) => set({ user }),
}))

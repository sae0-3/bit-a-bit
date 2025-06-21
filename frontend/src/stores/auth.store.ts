import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { AuthStore } from '../types/auth'
import { decodeToken } from '../utils/decodeToken'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: (token: string) => {
        try {
          const decoded = decodeToken(token)

          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            throw new Error('Token expirado')
          }

          set({
            token,
            user: {
              id: decoded.sub,
              email: decoded.email,
              role: decoded.role,
            },
          })
        } catch (error) {
          get().clearAuthData()
          throw error
        }
      },

      logout: () => {
        get().clearAuthData()
      },

      isAuthenticated: () => {
        const { token, user } = get()
        if (!token || !user) return false

        try {
          const decoded = decodeToken(token)
          return decoded.exp ? decoded.exp * 1000 > Date.now() : true
        } catch {
          get().clearAuthData()
          return false
        }
      },

      hasRole: (role: string) => {
        const { user } = get()
        return user?.role === role
      },

      clearAuthData: () => {
        set({ token: null, user: null })
      },
    }),
    {
      name: 'auth-storage',

      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        token: state.token,
        user: state.user
      }),

      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          try {
            const decoded = decodeToken(state.token)
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
              state.clearAuthData()
            }
          } catch {
            state.clearAuthData()
          }
        }
      },
    }
  )
)

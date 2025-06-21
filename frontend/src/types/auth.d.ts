export interface User {
  id: string
  email: string
  role: string
}

export interface AuthStore {
  user: User | null
  token: string | null

  login: (token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
  hasRole: (role: string) => boolean
  clearAuthData: () => void
}

export interface AuthResponse {
  access_token: string
}

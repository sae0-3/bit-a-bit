export interface User {
  id: string
  email: string
  role: string
}

export interface AuthState {
  user: User | null
  token: string | null

  login: (token: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export interface AuthResponse {
  access_token: string
}

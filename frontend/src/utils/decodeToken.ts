import { jwtDecode } from 'jwt-decode'

export interface TokenPayload {
  sub: string
  email: string
  role: string
  exp: number
  iat: number
}

export function decodeToken(token: string): TokenPayload {
  return jwtDecode<TokenPayload>(token)
}

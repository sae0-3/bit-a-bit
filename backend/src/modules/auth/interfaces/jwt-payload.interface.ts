export interface JwtPayload {
  sub: string;
  email: string;
  role: 'admin' | 'professor';
}

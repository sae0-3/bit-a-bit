export interface JwtPayload {
  sub: string;
  email: string;
  role: 'admin' | 'professor';
}

export interface RequestUser {
  id: string;
  email: string;
  role: string;
}

export interface TokenPayload {
  sub?: string;
  login: string;
  email: string;
  role: string;
  expiresIn?: string;
}

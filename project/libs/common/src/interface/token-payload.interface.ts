export interface ITokenPayload {
  sub: string;
  login: string;
  email: string;
  role: string;
  refreshToken?: string;
}

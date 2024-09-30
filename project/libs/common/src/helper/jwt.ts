import { IUser, TokenPayload } from '..';

export function createJWTPayload(user: IUser): TokenPayload {
  return {
    sub: user.id as unknown as string,
    login: user.login,
    email: user.email,
    role: user.role,
  };
}

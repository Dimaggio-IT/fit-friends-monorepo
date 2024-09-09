import { IUser, TokenPayload } from '..';

export function createJWTPayload(user: IUser): TokenPayload {
  return {
    sub: user.id as unknown as string,
    email: user.email,
    login: user.login,
  };
}

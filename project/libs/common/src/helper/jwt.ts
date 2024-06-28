import { User, TokenPayload } from '@project/common';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id as unknown as string,
    email: user.email,
    login: user.login,
  };
}

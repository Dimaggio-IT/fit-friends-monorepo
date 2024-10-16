import { IUser, ITokenPayload } from '..';

export function createJWTPayload(user: IUser): ITokenPayload {
  return {
    sub: user.id as unknown as string,
    login: user.login,
    email: user.email,
    role: user.role,
  };
}

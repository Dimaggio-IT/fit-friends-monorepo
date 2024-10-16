import { IUser } from './user.interface';

export interface IAuthUser extends IUser {
  passwordHash: string;
  accessToken?: string;
  refreshToken?: string;
}

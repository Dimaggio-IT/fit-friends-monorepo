import { IUser } from './user.interface';

export interface AuthUser extends IUser {
  passwordHash: string;
}

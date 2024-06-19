import { compare, genSalt, hash } from 'bcrypt';

import { Entity } from '@project/shared/core';
import { StorableEntity, AuthUser } from '@project/shared/core';

import { SALT_ROUNDS } from './shop-user.constant';

export class ShopUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public login: string;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.email = user.email;
    this.login = user.login;
    this.passwordHash = user.passwordHash ?? undefined;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      login: this.login,
      passwordHash: this.passwordHash,
    }
  }

  public async setPassword(password: string): Promise<ShopUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}

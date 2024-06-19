import { Injectable } from '@nestjs/common';

import { AuthUser, EntityFactory } from '@project/shared/core';
import { ShopUserEntity } from './shop-user.entity';
import { CreateUserDto } from '@project/authentication';

@Injectable()
export class ShopUserFactory implements EntityFactory<ShopUserEntity> {
  public create(entityPlainData: AuthUser): ShopUserEntity {
    return new ShopUserEntity(entityPlainData);
  }

  public static createFromDto(dto: CreateUserDto): ShopUserEntity {
    const entity = new ShopUserEntity();
    entity.email = dto.email;
    entity.login = dto.login;
    entity.passwordHash = '';

    return entity;
  }
}

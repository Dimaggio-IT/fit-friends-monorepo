import { Injectable } from '@nestjs/common';

import { AuthUser, EntityFactory } from '@project/shared/core';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '@project/authentication';

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  public create(entityPlainData: AuthUser): UserEntity {
    return new UserEntity(entityPlainData);
  }

  public static createFromDto(dto: CreateUserDto): UserEntity {
    const entity = new UserEntity();
    entity.email = dto.email;
    entity.login = dto.login;
    entity.passwordHash = '';

    return entity;
  }
}

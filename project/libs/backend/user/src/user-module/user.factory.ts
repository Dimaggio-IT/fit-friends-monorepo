import { Injectable } from '@nestjs/common';

import { IAuthUser, EntityFactory } from '@project/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from '@project/common';

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  public create(entityPlainData: IAuthUser): UserEntity {
    return new UserEntity(entityPlainData);
  }

  public static createFromDto(dto: CreateUserDto): UserEntity {
    const entity = new UserEntity();
    entity.email = dto.email;
    entity.login = dto.login;
    entity.location = dto.location;
    entity.sex = dto.sex;
    entity.birthday = new Date(dto.birthday);
    entity.passwordHash = '';

    return entity;
  }
}

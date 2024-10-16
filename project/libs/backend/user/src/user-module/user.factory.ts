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
    entity.avatar = dto.avatar;
    entity.description = dto.description ?? '';
    entity.location = dto.location;
    entity.backgroundImage = dto.backgroundImage;
    entity.sex = dto.sex;
    entity.birthday = new Date(dto.birthday);
    entity.email = dto.email;
    entity.login = dto.login;
    entity.passwordHash = '';
    entity.level = dto.level;
    entity.trainingType = dto.trainingType;
    entity.timeForTraining = '';
    entity.caloriesToReset = 0;
    entity.caloriesToResetPerDay = 0;
    entity.isReadyToTrain = false;
    entity.role = dto.role;
    entity.accessToken = '';
    entity.refreshToken = '';
    entity.friends = [];
    entity.balances = [];
    entity.orders = [];

    return entity;
  }
}

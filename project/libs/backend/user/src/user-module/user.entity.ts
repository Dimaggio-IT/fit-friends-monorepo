import { compare, genSalt, hash } from 'bcrypt';

import { Entity, USER_SALT_ROUNDS } from '@project/common';
import { StorableEntity, AuthUser } from '@project/common';

export class UserEntity extends Entity implements StorableEntity<AuthUser> {
  public createdAt?: Date;
  public avatar: string;
  public description: string;
  public location: string;
  public backgroundImage: string;
  public sex: string;
  public birthday: Date;
  public email: string;
  public login: string;
  public passwordHash: string;
  public level: string;
  public trainingType: string[];
  public timeForTraining: string;
  public caloriesToReset: number;
  public caloriesToResetPerDay: number;
  public isReadyToTrain: boolean;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.avatar = user.avatar ?? undefined;
    this.createdAt = user.createdAt ?? undefined;
    this.description = user.description ?? undefined;
    this.location = user.location;
    this.backgroundImage = user.backgroundImage;
    this.sex = user.sex;
    this.birthday = user.birthday;
    this.email = user.email;
    this.login = user.login;
    this.passwordHash = user.passwordHash ?? undefined;
    this.level = user.level;
    this.trainingType = user.trainingType;
    this.timeForTraining = user.timeForTraining;
    this.caloriesToReset = user.caloriesToReset;
    this.caloriesToResetPerDay = user.caloriesToResetPerDay;
    this.isReadyToTrain = user.isReadyToTrain;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      avatar: this.avatar,
      createdAt: this.createdAt,
      description: this.description,
      location: this.location,
      backgroundImage: this.backgroundImage,
      sex: this.sex,
      birthday: this.birthday,
      email: this.email,
      login: this.login,
      passwordHash: this.passwordHash,
      level: this.level,
      trainingType: this.trainingType,
      timeForTraining: this.timeForTraining,
      caloriesToReset: this.caloriesToReset,
      caloriesToResetPerDay: this.caloriesToResetPerDay,
      isReadyToTrain: this.isReadyToTrain,
    }
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(USER_SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}

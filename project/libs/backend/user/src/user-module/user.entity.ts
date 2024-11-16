import { compare, genSalt, hash } from 'bcrypt';

import { Entity, USER_SALT_ROUNDS, UserLevel, UserRole, WorkoutType } from '@project/common';
import { StorableEntity, IAuthUser } from '@project/common';
import { IFriend, IBalance, IOrder } from '@project/common';

export class UserEntity extends Entity implements StorableEntity<IAuthUser> {
  public createdAt?: Date;
  public avatar?: string;
  public description: string;
  public location: string;
  public backgroundImage?: string;
  public sex: string;
  public birthday: Date;
  public email: string;
  public login: string;
  public passwordHash: string;
  public level: UserLevel;
  public trainingType: WorkoutType[];
  public timeForTraining?: string;
  public caloriesToReset?: number;
  public caloriesToResetPerDay?: number;
  public isReadyToTrain?: boolean;
  public isPersonalTraining?: boolean;
  public achievement?: string;
  public certificate?: string[];
  public role: UserRole;
  public accessToken?: string;
  public refreshToken?: string;
  public friends?: IFriend[];
  public balances?: IBalance[];
  public orders?: IOrder[];

  constructor(user?: IAuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: IAuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.avatar = user.avatar ?? undefined;
    this.createdAt = user.createdAt ?? undefined;
    this.description = user.description;
    this.location = user.location;
    this.backgroundImage = user.backgroundImage ?? undefined;
    this.sex = user.sex;
    this.birthday = user.birthday;
    this.email = user.email;
    this.login = user.login;
    this.passwordHash = user.passwordHash ?? undefined;
    this.level = user.level;
    this.trainingType = user.trainingType ?? [];
    this.timeForTraining = user.timeForTraining ?? undefined;
    this.caloriesToReset = user.caloriesToReset ?? undefined;
    this.caloriesToResetPerDay = user.caloriesToResetPerDay ?? undefined;
    this.isReadyToTrain = user.isReadyToTrain ?? undefined;
    this.isPersonalTraining = user.isReadyToTrain ?? undefined;
    this.achievement = user.achievement ?? undefined;
    this.certificate = user.certificate ?? [];
    this.role = user.role;
    this.accessToken = user.accessToken ?? undefined;
    this.refreshToken = user.refreshToken ?? undefined;
    this.friends = user.friends ?? [];
    this.balances = user.balances ?? [];
    this.orders = user.orders ?? [];
  }

  public toPOJO(): IAuthUser {
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
      timeForTraining: this.timeForTraining ?? undefined,
      caloriesToReset: this.caloriesToReset,
      caloriesToResetPerDay: this.caloriesToResetPerDay,
      isReadyToTrain: this.isReadyToTrain,
      isPersonalTraining: this.isPersonalTraining,
      achievement: this.achievement,
      certificate: this.certificate,
      role: this.role,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      friends: this.friends,
      balances: this.balances,
      orders: this.orders,
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

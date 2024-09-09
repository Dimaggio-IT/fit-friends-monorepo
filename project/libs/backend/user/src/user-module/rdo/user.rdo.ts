import { Expose } from 'class-transformer';
import { IUserRdo } from '@project/common';

export class UserRdo implements IUserRdo {
  @Expose()
  public id: string;

  @Expose()
  public createdAt: string;

  @Expose()
  avatar: string;

  @Expose()
  description: string;

  @Expose()
  location: string;

  @Expose()
  backgroundImage: string;

  @Expose()
  sex: string;

  @Expose()
  birthday: string;

  @Expose()
  login: string;

  @Expose()
  email: string;

  @Expose()
  level: string;

  @Expose()
  trainingType: string[];

  @Expose()
  timeForTraining: string;

  @Expose()
  caloriesToReset: number;

  @Expose()
  caloriesToResetPerDay: number;

  @Expose()
  isReadyToTrain: boolean;
}

import { ProductType } from '../enum/shared.enum';
import { UserLevel, UserLocation, UserSex } from '../enum/user.enum';

export interface User {
  id?: string;
  avatar?: string;
  createdAt?: Date;
  description?: string;
  location: UserLocation;
  backgroundImage: string;
  sex: UserSex
  birthday: Date;
  login: string;
  email: string;
  level: UserLevel;
  trainingType: ProductType[];
  timeForTraining: string;
  caloriesToReset: number;
  caloriesToResetPerDay: number;
  isReadyToTrain: boolean;
}

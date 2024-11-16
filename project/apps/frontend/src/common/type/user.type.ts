import { WorkoutType } from '../constant/training.const';
import { UserLevel, UserLocation } from '../constant/user.const';

type TUserId = string;

type TAuthData = {
  email: string;
  password: string;
};

type TAuthResponse = {
  id: string;
  email: string;
  login: string;
  accessToken: string;
  refreshToken: string;
};

type TRegResponse = {
  id: string;
  email: string;
  login: string;
  registrationDate: string;
};

type TUserLocation = keyof typeof UserLocation;

type TUserLocationValue = typeof UserLocation[keyof typeof UserLocation];

type TUserSex = 'мужской' | 'женский' | 'неважно';

type TUserRole = 'атлет' | 'тренер';

type TUserLevelValue = typeof UserLevel[keyof typeof UserLevel];

type TUserWorkOutTypeValue = typeof WorkoutType[keyof typeof WorkoutType];

type TRegData = {
  email: string;
  login: string;
  password: string;
  location: TUserLocationValue | null;
  sex: TUserSex;
  birthday: string;
  role: TUserRole;
}

type TUpdatingUserInfo = {
  avatar?: string;
  login?: string;
  description?: string;
  location?: TUserLocationValue;
  backgroundImage?: string;
  sex?: TUserSex;
  birthday?: string;
  level?: TUserLevelValue;
  role?: TUserRole;
  trainingType?: TUserWorkOutTypeValue[];
  timeForTraining?: string;
  caloriesToReset?: number;
  caloriesToResetPerDay?: number;
  isReadyToTrain?: boolean;
  isPersonalTraining?: boolean;
  achievement?: string;
  certificate?: string[];
}

type TFileType = {
  avatarFile?: File;
  trainingVideoFile?: File;
}

export {
  type TUserId,
  type TAuthResponse,
  type TAuthData,
  type TUserLocation,
  type TRegData,
  type TRegResponse,
  type TUserLocationValue,
  type TUpdatingUserInfo,
  type TUserSex,
  type TUserRole,
  type TUserLevelValue,
  type TUserWorkOutTypeValue,
  type TFileType,
};

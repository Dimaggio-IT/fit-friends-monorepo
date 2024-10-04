import { UserLocation } from '../constant/user.const';

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

type TUserRole = 'sportsman' | 'coach';

type TRegData = {
  email: string;
  login: string;
  password: string;
  location: TUserLocationValue | null;
  sex: TUserSex;
  birthday: string;
  role: TUserRole;
}

export {
  type TUserId,
  type TAuthResponse,
  type TAuthData,
  type TUserLocation,
  type TRegData,
  type TRegResponse,
  type TUserLocationValue,
};

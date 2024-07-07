import { USER_LOCATION } from '../constant/user.const';

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

type TUserLocation = keyof typeof USER_LOCATION;

type TUserLocationValue = typeof USER_LOCATION[keyof typeof USER_LOCATION ];

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

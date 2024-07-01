type TUserId = string;

type TAuthData = {
  email: string;
  password: string;
};

type TUserData = {
  id: string;
  email: string;
  login: string;
  accessToken: string;
};

export {
  type TUserId,
  type TUserData,
  type TAuthData,
};

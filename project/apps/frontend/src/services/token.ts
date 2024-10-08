type TToken = string;

const ACCESS_TOKEN_KEY_NAME = 'fit-friends-access-token';
const REFRESH_TOKEN_KEY_NAME = 'fit-friends-refresh-token';

const getToken = (tokenKeyName: TToken): TToken => {
  const token = localStorage.getItem(tokenKeyName);
  return token ?? '';
};

const getAccessToken = (): string => getToken(ACCESS_TOKEN_KEY_NAME);

const getRefreshToken = (): string => getToken(REFRESH_TOKEN_KEY_NAME);

const saveAccessToken = (token: TToken): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);
};

const saveRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, token);
};

const dropAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
};

const dropRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};

export {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  dropAccessToken,
  dropRefreshToken,
 };

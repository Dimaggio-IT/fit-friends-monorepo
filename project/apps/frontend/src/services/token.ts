import { TokenCharacteristics } from '../common';

type TToken = string;

const getToken = (tokenKeyName: TToken): TToken => {
  const token = localStorage.getItem(tokenKeyName);
  return token ?? '';
};

const getAccessToken = (): string => getToken(TokenCharacteristics.AccessTokenKey);

const getRefreshToken = (): string => getToken(TokenCharacteristics.RefreshTokenKey);

const saveAccessToken = (token: TToken): void => {
  localStorage.setItem(TokenCharacteristics.AccessTokenKey, token);
};

const saveRefreshToken = (token: string) => {
  localStorage.setItem(TokenCharacteristics.RefreshTokenKey, token);
};

const dropAccessToken = (): void => {
  localStorage.removeItem(TokenCharacteristics.AccessTokenKey);
};

const dropRefreshToken = (): void => {
  localStorage.removeItem(TokenCharacteristics.RefreshTokenKey);
};

// NOTE: остановился здесь
export function isTokenExpired(): boolean {
  const token = getAccessToken();

  try {

    return Date.now() >= payload.exp * TIME_MC - bufferTime;
  } catch (error) {
    return true;
  }
}

export {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  dropAccessToken,
  dropRefreshToken,
 };

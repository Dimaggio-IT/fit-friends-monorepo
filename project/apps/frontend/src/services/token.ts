import { jwtDecode } from 'jwt-decode';
import { TokenCharacteristics } from '../common';
import dayjs from 'dayjs';

type TToken = string;

type TTokenType = typeof TokenCharacteristics[keyof Omit<typeof TokenCharacteristics, 'LifeSpanMinutes'>]

const getToken = (tokenKeyName: TTokenType): string => {
  const token = localStorage.getItem(tokenKeyName);
  return token ?? '';
};

const getAccessToken = (): string => getToken(TokenCharacteristics.AccessTokenKey);

const getRefreshToken = (): string => getToken(TokenCharacteristics.RefreshTokenKey);

const saveAccessToken = (token: TToken): void => {
  localStorage.setItem(TokenCharacteristics.AccessTokenKey, token);
};

const saveRefreshToken = (token: TToken) => {
  localStorage.setItem(TokenCharacteristics.RefreshTokenKey, token);
};

const dropAccessToken = (): void => {
  localStorage.removeItem(TokenCharacteristics.AccessTokenKey);
};

const dropRefreshToken = (): void => {
  localStorage.removeItem(TokenCharacteristics.RefreshTokenKey);
};

const dropTokens = (): void => {
  dropAccessToken();
  dropRefreshToken();
};

const saveTokens = (accessToken: TToken, refreshToken: TToken): void => {
  saveAccessToken(accessToken);
  saveRefreshToken(refreshToken);
};

function hasTokenTypeExpired(tokenType: TTokenType) {
  try {
    const token = tokenType === TokenCharacteristics.AccessTokenKey ? getAccessToken() : getRefreshToken();
    const decryptedToken = jwtDecode(token);

    if (!decryptedToken || typeof decryptedToken.exp !== 'number' || decryptedToken.exp <= 0) {
      return { isExpired: true, token };
    }

    const expiresAt = dayjs.unix(decryptedToken.exp);

    return { isExpired: expiresAt.isBefore(dayjs()), token };
  } catch (error) {
    return { isExpired: true, token: '' };
  }
}

export {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  dropAccessToken,
  dropRefreshToken,
  hasTokenTypeExpired,
  dropTokens,
  saveTokens,
};

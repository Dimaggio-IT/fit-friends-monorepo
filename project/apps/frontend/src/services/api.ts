import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { dropTokens, getAccessToken, getRefreshToken, hasTokenTypeExpired, saveTokens } from './token';
import { StatusCodes } from 'http-status-codes';
import { TApiError } from '@project/common';
import { toast } from 'react-toastify';
import { TokenCharacteristics } from '../common';

const HOST = '127.0.0.1';
const PORT = 4000;
const BACKEND_URL = `http://${HOST}:${PORT}/api`;
const REQUEST_TIMEOUT = 5000;

const generateAuthString = (token: string): string => { return token ? `Bearer ${token}` : '' };

const addBearerAuthToHeaders = (headers: AxiosRequestHeaders, token: string) => {
  if (token) {
    headers['Authorization'] = generateAuthString(token);
  }

  return headers;
};

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      Authorization: generateAuthString(getAccessToken()),
    },
  });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const headers = config.headers;

      const { token: tokenAccess, isExpired: isAccessTokenExpired } = hasTokenTypeExpired(TokenCharacteristics.AccessTokenKey);

      const { token: tokenRefresh, isExpired: isRefreshTokenExpired } = hasTokenTypeExpired(TokenCharacteristics.RefreshTokenKey);

      if (!isAccessTokenExpired) {
        addBearerAuthToHeaders(headers, tokenAccess);
        return config;
      }

      // TODO: точка 4
      if (!isRefreshTokenExpired) {
        const response = await axios.post(
          `${BACKEND_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: generateAuthString(getRefreshToken()),
            },
          },
        );

        if (response.status === StatusCodes.OK) {
          saveTokens(response.data.accessToken, response.data.refreshToken);
          config.headers.Authorization = `Bearer ${getAccessToken()}`;
          return config;
        }
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<TApiError>) => {
      if (error.response && isSupposedToRenderError(error.response)) {
        if (Array.isArray(error.response.data.message)) {
          error.response.data.message = error.response.data.message.join('\n');
        }
        toast.error(error.response.data.message);
      } else if (error.response && error.response.status === StatusCodes.UNAUTHORIZED) {
        dropTokens();
      }

      return Promise.reject(error);
    }
  );

  return api;
};

// USEFUL: НА ПАМЯТЬ! Интересный синтаксис получения значения объекта по переданному в ф-ию Ключу через нотацию массива
function isSupposedToRenderError(response: AxiosResponse) {
  return {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.NOT_FOUND]: true,
    [StatusCodes.INTERNAL_SERVER_ERROR]: true,
    [StatusCodes.NOT_IMPLEMENTED]: true,
    [StatusCodes.BAD_GATEWAY]: true,
  }[response.status];
}

export { createAPI };

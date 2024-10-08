import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { TApiError } from '@project/common';
import { toast } from 'react-toastify';

const HOST = '127.0.0.1';
const PORT = 4000;
const BACKEND_URL = `http://${HOST}:${PORT}/api`;
const REQUEST_TIMEOUT = 5000;

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      const auth = token ? `Bearer ${token}` : '';

      if (token && config.headers) {
        config.headers['Authorization'] = auth;
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
      }


      if (error.response && error.response.status === StatusCodes.UNAUTHORIZED) {
        const refreshToken = getRefreshToken();

      }

      return Promise.reject(error);
    }
  );

  return api;
};

// USEFUL: НА ПАМЯТЬ! Интересный синтаксис: получение значения объекта по переданному в ф-ию Ключу через нотацию массива
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

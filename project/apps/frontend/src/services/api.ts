import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';

const HOST = '127.0.0.1';
const PORT = 4000;
const BACKEND_URL = `http://${HOST}:${PORT}/api`;
const REQUEST_TIMEOUT = 5000;

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      const auth = token ? `Bearer ${token}` : '';

      if (token && config.headers) {
        config.headers['Authorization'] = auth;
      }

      return config;
    },
  );

  return api;
};

export { createAPI };

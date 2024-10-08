import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRegData, TRegResponse, TThunkApiConfig } from '../../common';
import { APIRoute, NameSpace } from '../../common';
import { TAuthData, TAuthResponse } from '../../common';
import { dropAccessToken, saveAccessToken } from '../../services/token';

const getAsyncAuth = createAsyncThunk<TAuthResponse, undefined, TThunkApiConfig>(
  `${NameSpace.UserProcess}/getAuthStatus`,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<TAuthResponse>(APIRoute.Login);

      return data;
    } catch (error) {
      throw new Error();
    }
  },
);

const postAsyncAuth = createAsyncThunk<TAuthResponse, TAuthData, TThunkApiConfig>(
  `${NameSpace.UserProcess}/postLogin`,
  async ({ email, password }, { extra: api }) => {
    try {
      const { data } = await api.post<TAuthResponse>(APIRoute.Login, { email, password });
      saveAccessToken(data.accessToken);
      return data;
    } catch (error) {
      throw new Error();
    }
  },
);

const postAsyncReg = createAsyncThunk<TRegResponse, TRegData, TThunkApiConfig>(
  `${NameSpace.UserProcess}/postReg`,
  async({
    email,
    login,
    password,
    location,
    sex,
    birthday,
    role
  }, { extra: api }) => {
    try {
      const { data } = await api.post<TRegResponse>(APIRoute.Register, {
        email,
        login,
        password,
        location,
        sex,
        birthday,
        role,
      });
      return data;
    } catch (error) {
      throw new Error();
    }
  },
);

const deleteAsyncAuth = createAsyncThunk<void, undefined, TThunkApiConfig>(
  `${NameSpace.UserProcess}/deleteAuth`,
  async (_arg, { extra: api }) => {
    try {
      dropAccessToken();
    } catch (error) {
      throw new Error();
    }
  }
);

export { getAsyncAuth, postAsyncAuth, deleteAsyncAuth, postAsyncReg };

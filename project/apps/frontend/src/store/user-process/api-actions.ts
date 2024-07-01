import { createAsyncThunk } from '@reduxjs/toolkit';
import { TThunkApiConfig } from '../../common';
import { APIRoute, NameSpace } from '../../common';
import { TAuthData, TUserData } from '../../common';
import { dropToken, saveToken } from '../../services/token';

const getAsyncAuth = createAsyncThunk<TUserData, undefined, TThunkApiConfig>(
  `${NameSpace.User}/fetchAuthStatus`,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<TUserData>(APIRoute.Login);

      return data;
    } catch (error) {
      throw new Error();
    }
  },
);

const postAsyncAuth = createAsyncThunk<TUserData, TAuthData, TThunkApiConfig>(
  `${NameSpace.User}/fetchLogin`,
  async ({ email, password }, { extra: api }) => {
    try {
      const { data } = await api.post<TUserData>(APIRoute.Login, { email, password });
      saveToken(data.accessToken);
      return data;
    } catch (error) {
      throw new Error();
    }
  },
);

const deleteAsyncAuth = createAsyncThunk<void, undefined, TThunkApiConfig>(
  `${NameSpace.User}/fetchLogout`,
  async (_arg, { extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    } catch (error) {
      throw new Error();
    }
  }
);

export { getAsyncAuth, postAsyncAuth, deleteAsyncAuth };

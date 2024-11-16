import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserRdo } from '@project/common';
import { TFileType, TThunkApiConfig, TUpdatingUserInfo } from '../../common';
import { APIRoute, NameSpace } from '../../common';
import { AxiosError } from 'axios';

const getAsyncUser = createAsyncThunk<IUserRdo, undefined, TThunkApiConfig>(
  `${NameSpace.User}/getUser`,
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<IUserRdo>(`${APIRoute.User}`);
      return data;
    } catch (error) {
      if (error instanceof Error && !('response' in error)) {
        throw error;
      }

      return rejectWithValue(((error as AxiosError<unknown>).response?.data) as Error)
    }
  },
);

const patchAsyncUser = createAsyncThunk<IUserRdo, TUpdatingUserInfo & TFileType, TThunkApiConfig>(
  `${NameSpace.User}/patchUser`,
  async (user, { extra: api, rejectWithValue }) => {
    try {
      return await api.patch(`${APIRoute.User}`, user);
    } catch (error) {
      if (error instanceof Error && !('response' in error)) {
        throw error;
      }

      return rejectWithValue(((error as AxiosError<unknown>).response?.data) as Error)
    }
  },
);

const deleteAsyncUser = createAsyncThunk<undefined, string, TThunkApiConfig>(
  `${NameSpace.User}/deleteUser`,
  async (userId, { extra: api, rejectWithValue }) => {
    try {
      return await api.delete(`${APIRoute.Users}/${userId}`);
    } catch (error) {
      if (error instanceof Error && !('response' in error)) {
        throw error;
      }

      return rejectWithValue(((error as AxiosError<unknown>).response?.data) as Error)
    }
  },
);

export {
  getAsyncUser,
  deleteAsyncUser,
  patchAsyncUser,
};

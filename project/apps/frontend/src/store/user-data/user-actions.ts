import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, IUserRdo } from '@project/common';
import { TThunkApiConfig } from '../../common';
import { APIRoute, NameSpace } from '../../common';
import { AxiosError } from 'axios';

const getAsyncUser = createAsyncThunk<IUserRdo, string, TThunkApiConfig>(
  `${NameSpace.User}/getUser`,
  async (userId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<IUserRdo>(`${APIRoute.Users}/${userId}`);
      return data;
    } catch (error) {
      if (error instanceof Error && !('response' in error)) {
        throw error;
      }

      return rejectWithValue(((error as AxiosError<unknown>).response?.data) as Error)
    }
  },
);

const patchAsyncUser = createAsyncThunk<IUserRdo, Partial<IUser>, TThunkApiConfig>(
  `${NameSpace.User}/patchUser`,
  async (user, { extra: api, rejectWithValue }) => {
    const userId = user.id as string;
    try {
      return await api.patch(`${APIRoute.Users}/${userId}`, user);
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

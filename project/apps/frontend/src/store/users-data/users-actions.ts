import { createAsyncThunk } from '@reduxjs/toolkit';
import { INotificationRdo, IUserRdo, IUsersWithPagination } from '@project/common';
import { TThunkApiConfig } from '../../common';
import { APIRoute, NameSpace } from '../../common';
import { AxiosError } from 'axios';

const getAsyncUsers = createAsyncThunk<IUserRdo[], undefined, TThunkApiConfig>(
  `${NameSpace.Users}/fetchUsers`,
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<IUsersWithPagination>(APIRoute.Users);
      return data.entities;
    } catch (error) {
      if (error instanceof Error && !('response' in error)) {
        throw error;
      }

      return rejectWithValue(((error as AxiosError<unknown>).response?.data) as Error)
    }
  },
);

const getAsyncNotifications = createAsyncThunk<INotificationRdo[], undefined, TThunkApiConfig>(
  `${NameSpace.Users}/fetchNotifications`,
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<INotificationRdo[]>(APIRoute.Notifications);
      return data;
    } catch (error) {
      if (error instanceof Error && !('response' in error)) {
        throw error;
      }

      return rejectWithValue(((error as AxiosError<unknown>).response?.data) as Error)
    }
  },
);

const deleteAsyncNotification = createAsyncThunk<undefined, string, TThunkApiConfig>(
  `${NameSpace.Users}/fetchNotifications`,
  async (id, { extra: api, rejectWithValue }) => {
    try {
      return await api.delete(`${APIRoute.Notifications}/${id}`);
    } catch (error) {
      if (error instanceof Error && !('response' in error)) {
        throw error;
      }

      return rejectWithValue(((error as AxiosError<unknown>).response?.data) as Error)
    }
  },
);

export {
  getAsyncUsers,
  getAsyncNotifications,
  deleteAsyncNotification,
};

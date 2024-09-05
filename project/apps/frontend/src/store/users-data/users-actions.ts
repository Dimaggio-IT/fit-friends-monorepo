import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserRdo, UsersWithPagination } from '@project/common';
import { TThunkApiConfig } from '../../common';
import { APIRoute, NameSpace } from '../../common';
import { AxiosError } from 'axios';

const getAsyncUsers = createAsyncThunk<UserRdo[], undefined, TThunkApiConfig>(
  `${NameSpace.Users}/fetchUsers`,
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<UsersWithPagination>(APIRoute.Users);
      return data.entities;
    } catch (error) {
      if (error instanceof Error && !('response' in error)) {
        throw error;
      }

      return rejectWithValue(((error as AxiosError<unknown>).response?.data) as Error)
    }
  },
);

export { getAsyncUsers };

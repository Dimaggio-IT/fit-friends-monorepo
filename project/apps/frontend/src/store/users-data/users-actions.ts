import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserRdo, IUsersWithPagination } from '@project/common';
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

export { getAsyncUsers };

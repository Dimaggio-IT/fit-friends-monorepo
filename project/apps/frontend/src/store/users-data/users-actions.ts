import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserRdo, UsersWithPagination } from '@project/common';
import { TThunkApiConfig } from '../../common';
import { APIRoute, NameSpace } from '../../common';

const getAsyncUsers = createAsyncThunk<UserRdo[], undefined, TThunkApiConfig>(
  `${NameSpace.Users}/fetchUsers`,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<UsersWithPagination>(APIRoute.Users);
      return data.entities;
    } catch (error) {
      throw new Error();
    }
  },
);

export { getAsyncUsers };

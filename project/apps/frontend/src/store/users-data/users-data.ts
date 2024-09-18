import { createSlice } from '@reduxjs/toolkit';
import { IUserRdo } from '@project/common';
import { NameSpace } from '../../common';
import { getAsyncUsers } from './users-actions';

type TUsersData = {
  users: IUserRdo[];
  isUsersLoading: boolean;
};

const initialState: TUsersData = {
  users: [],
  isUsersLoading: false,
};

const usersData = createSlice({
  name: NameSpace.Users,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAsyncUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getAsyncUsers.rejected, (state) => {
        state.isUsersLoading = false;
      })
      .addCase(getAsyncUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      });
  }
});

export {
  usersData,
  type TUsersData
};

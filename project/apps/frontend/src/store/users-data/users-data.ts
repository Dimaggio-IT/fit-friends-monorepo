import { createSlice } from '@reduxjs/toolkit';
import { INotificationRdo, IUserRdo } from '@project/common';
import { NameSpace } from '../../common';
import { getAsyncUserNotifications, getAsyncUsers } from './users-actions';

type TUsersData = {
  users: IUserRdo[];
  notifications: INotificationRdo[];
  isUsersDataBeingUploaded: boolean;
};

const initialState: TUsersData = {
  users: [],
  notifications: [],
  isUsersDataBeingUploaded: false,
};

const usersData = createSlice({
  name: NameSpace.Users,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAsyncUsers.pending, (state) => {
        state.isUsersDataBeingUploaded = true;
      })
      .addCase(getAsyncUsers.rejected, (state) => {
        state.isUsersDataBeingUploaded = false;
      })
      .addCase(getAsyncUsers.fulfilled, (state, action) => {
        state.isUsersDataBeingUploaded = false;
        state.users = action.payload;
      })
      .addCase(getAsyncUserNotifications.pending, (state) => {
        state.isUsersDataBeingUploaded = true;
      })
      .addCase(getAsyncUserNotifications.rejected, (state) => {
        state.isUsersDataBeingUploaded = false;
      })
      .addCase(getAsyncUserNotifications.fulfilled, (state, action) => {
        state.isUsersDataBeingUploaded = false;
        state.notifications = action.payload;
      });
  }
});

export {
  usersData,
  type TUsersData
};

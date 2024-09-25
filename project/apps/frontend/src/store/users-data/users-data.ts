import { createSlice } from '@reduxjs/toolkit';
import { INotificationRdo, IUserRdo } from '@project/common';
import { NameSpace } from '../../common';
import { getAsyncNotifications, getAsyncUsers } from './users-actions';

type TUsersData = {
  users: IUserRdo[];
  notifications: INotificationRdo[];
  isUserDataBeingUploaded: boolean;
};

const initialState: TUsersData = {
  users: [],
  notifications: [],
  isUserDataBeingUploaded: false,
};

const usersData = createSlice({
  name: NameSpace.Users,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAsyncUsers.pending, (state) => {
        state.isUserDataBeingUploaded = true;
      })
      .addCase(getAsyncUsers.rejected, (state) => {
        state.isUserDataBeingUploaded = false;
      })
      .addCase(getAsyncUsers.fulfilled, (state, action) => {
        state.isUserDataBeingUploaded = false;
        state.users = action.payload;
      })
      .addCase(getAsyncNotifications.pending, (state) => {
        state.isUserDataBeingUploaded = true;
      })
      .addCase(getAsyncNotifications.rejected, (state) => {
        state.isUserDataBeingUploaded = false;
      })
      .addCase(getAsyncNotifications.fulfilled, (state, action) => {
        state.isUserDataBeingUploaded = false;
        state.notifications = action.payload;
      });
  }
});

export {
  usersData,
  type TUsersData
};

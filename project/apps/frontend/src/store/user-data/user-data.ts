import { createSlice } from '@reduxjs/toolkit';
import { IUserRdo } from '@project/common';
import { NameSpace } from '../../common';
import { getAsyncUser, patchAsyncUser, deleteAsyncUser } from './user-actions';

type TUserData = {
  user: IUserRdo | null;
  isUserDataBeingUploaded: boolean | undefined;
  isUserDataBeingUpdated: boolean | undefined;
  isUserDataBeingDeleted: boolean | undefined;
};

const initialState: TUserData = {
  user: null,
  isUserDataBeingUploaded: undefined,
  isUserDataBeingUpdated: undefined,
  isUserDataBeingDeleted: undefined,
};

const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAsyncUser.pending, (state) => {
        state.isUserDataBeingUploaded = true;
      })
      .addCase(getAsyncUser.rejected, (state) => {
        state.isUserDataBeingUploaded = false;
      })
      .addCase(getAsyncUser.fulfilled, (state, action) => {
        state.isUserDataBeingUploaded = false;
        state.user = action.payload;
      })
      .addCase(patchAsyncUser.pending, (state) => {
        state.isUserDataBeingUpdated = true;
      })
      .addCase(patchAsyncUser.rejected, (state) => {
        state.isUserDataBeingUpdated = false;
      })
      .addCase(patchAsyncUser.fulfilled, (state, action) => {
        state.isUserDataBeingUpdated = false;
        state.user = action.payload;
      })
      .addCase(deleteAsyncUser.pending, (state) => {
        state.isUserDataBeingDeleted = true;
      })
      .addCase(deleteAsyncUser.rejected, (state) => {
        state.isUserDataBeingDeleted = false;
      })
      .addCase(deleteAsyncUser.fulfilled, (state) => {
        state.isUserDataBeingDeleted = false;
        state.user = null;
      });
  }
});

export {
  userData,
  type TUserData,
};

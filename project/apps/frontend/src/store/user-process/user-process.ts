import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../common';
import { TUserData } from '../../common';
import { deleteAsyncAuth, getAsyncAuth, postAsyncAuth } from './api-actions';

type TUserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: TUserData | null;
};

const initialState: TUserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAsyncAuth.fulfilled, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = payload;

      })
      .addCase(getAsyncAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(postAsyncAuth.fulfilled, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = payload;
      })
      .addCase(postAsyncAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(deleteAsyncAuth.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export {
  userProcess,
  type TUserProcess,
};

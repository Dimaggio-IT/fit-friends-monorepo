import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../common';
import { deleteAsyncAuth, getAsyncAuth, postAsyncAuth, postAsyncReg } from './api-actions';

type TUserIds = {
  id: string;
  login: string;
  email: string;
};

type TUserProcess = {
  authorizationStatus: AuthorizationStatus;
  userIDs: TUserIds;
};

const initialState: TUserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userIDs: {
    id: '',
    login: '',
    email: '',
  },
};

const userProcess = createSlice({
  name: NameSpace.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postAsyncReg.fulfilled, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userIDs.id = payload.id ?? '';
        state.userIDs.login = payload.login ?? '';
        state.userIDs.email = payload.email ?? '';
      })
      .addCase(postAsyncReg.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userIDs.id = '';
        state.userIDs.login = '';
        state.userIDs.email = '';
      })
      .addCase(getAsyncAuth.fulfilled, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userIDs.id = payload.id ?? '';
        state.userIDs.login = payload.login ?? '';
        state.userIDs.email = payload.email ?? '';
      })
      .addCase(getAsyncAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userIDs.id = '';
        state.userIDs.login = '';
        state.userIDs.email = '';
      })
      .addCase(postAsyncAuth.fulfilled, (state, { payload }) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userIDs.id = payload.id ?? '';
        state.userIDs.login = payload.login ?? '';
        state.userIDs.email = payload.email ?? '';
      })
      .addCase(postAsyncAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userIDs.id = '';
        state.userIDs.login = '';
        state.userIDs.email = '';
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

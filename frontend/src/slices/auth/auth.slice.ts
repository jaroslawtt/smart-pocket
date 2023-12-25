import { type UserAuthResponse } from '~/packages/users/users.js';
import { createSlice } from '@reduxjs/toolkit';
import { ValueOf } from '~/libs/types/types.js';
import { DataStatus, SliceName } from '~/libs/enums/enums.js';
import {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from '~/slices/auth/actions.js';
import {updateUserDetails, updateUserProfilePicture} from "~/slices/users/actions";

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  user: UserAuthResponse | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const { reducer, actions } = createSlice({
  initialState,
  name: SliceName.AUTH,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.user = payload;
    });
    builder.addCase(signUp.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.user = payload;
    });
    builder.addCase(signIn.pending, (state, { payload }) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.user = payload;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, { payload }) => {
      state.user = payload;
    })
    builder.addCase(updateUserProfilePicture.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export { actions, reducer };

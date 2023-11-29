import { type UserAuthResponse } from '~/packages/users/users.js';
import { createSlice } from '@reduxjs/toolkit';
import { ValueOf } from '~/libs/types/types.js';
import { DataStatus, SliceName } from '~/libs/enums/enums.js';
import { getCurrentUser, signIn, signUp } from '~/slices/auth/actions.js';

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
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.user = payload;
    });
    builder.addCase(signIn.pending, (state, { payload }) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.user = payload;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
  },
});

export { actions, reducer };

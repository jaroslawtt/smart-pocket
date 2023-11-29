import { createSlice } from '@reduxjs/toolkit';
import { type AccountGetAllItemResponseDto } from '~/packages/accounts/accounts.js';
import { ValueOf } from '~/libs/types/types.js';
import { DataStatus, SliceName } from '~/libs/enums/enums.js';
import {
  createAccount,
  deleteAccount,
  getUserAccounts,
  updateAccount,
} from '~/slices/accounts/actions.js';

type InitialState = {
  accounts: AccountGetAllItemResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: InitialState = {
  accounts: [],
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions } = createSlice({
  name: SliceName.ACCOUNTS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAccounts.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getUserAccounts.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.accounts = payload.items;
    });
    builder.addCase(createAccount.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(createAccount.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.accounts = [...state.accounts, payload];
    });
    builder.addCase(updateAccount.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(updateAccount.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.accounts = state.accounts.map((account) =>
        account.id === payload.id ? payload : account,
      );
    });
    builder.addCase(deleteAccount.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(deleteAccount.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.accounts = state.accounts.filter(
        (account) => account.id !== payload,
      );
    });
  },
});

export { reducer, actions };

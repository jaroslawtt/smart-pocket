import { createSlice } from '@reduxjs/toolkit';
import { type AccountGetAllItemResponseDto } from '~/packages/accounts/accounts.js';
import { ValueOf } from '~/libs/types/types.js';
import { DataStatus, SliceName } from '~/libs/enums/enums.js';
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getUserAccounts,
  updateAccount,
} from '~/slices/accounts/actions.js';

type InitialState = {
  accounts: AccountGetAllItemResponseDto[];
  currentAccount: AccountGetAllItemResponseDto | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: InitialState = {
  accounts: [],
  currentAccount: null,
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
      state.currentAccount = state.currentAccount
        ? state.currentAccount.id === payload.id
          ? payload
          : state.currentAccount
        : state.currentAccount;
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

    builder.addCase(getAccountById.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getAccountById.fulfilled, (state, { payload }) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.currentAccount = payload;
    });
  },
});

export { reducer, actions };

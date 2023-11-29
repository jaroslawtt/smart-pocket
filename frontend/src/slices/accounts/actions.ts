import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  type AccountGetAllResponseDto,
  type AccountCreateRequestDto,
  type AccountUpdateRequestDto,
  type AccountGetAllItemResponseDto,
} from '~/packages/accounts/accounts.js';
import { type AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import { type ActionPayloadWithId } from '~/libs/types/action-payload-with-id.type.js';
import { SliceName } from '~/libs/enums/enums.js';

const sliceName = SliceName.ACCOUNTS;
const getUserAccounts = createAsyncThunk<
  AccountGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-user-accounts`, async (payload, { extra }) => {
  const { accountsApi } = extra;
  const accounts = await accountsApi.getAccounts();

  return accounts;
});

const createAccount = createAsyncThunk<
  AccountGetAllItemResponseDto,
  AccountCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-account`, async (payload, { extra }) => {
  const { accountsApi } = extra;
  const account = await accountsApi.createAccount(payload);

  return account;
});

const updateAccount = createAsyncThunk<
  AccountGetAllItemResponseDto,
  ActionPayloadWithId<string, AccountUpdateRequestDto>,
  AsyncThunkConfig
>(`${sliceName}/update-account`, async ({ id, payload }, { extra }) => {
  const { accountsApi } = extra;

  const account = await accountsApi.updateAccount(id, payload);

  return account;
});

const deleteAccount = createAsyncThunk<string, string, AsyncThunkConfig>(
  `${sliceName}/delete-account`,
  async (payload, { extra }) => {
    const { accountsApi } = extra;

    await accountsApi.deleteAccount(payload);

    return payload;
  },
);

export { getUserAccounts, createAccount, updateAccount, deleteAccount };

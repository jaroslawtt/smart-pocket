import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  type UserAuthResponse,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './auth.slice.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { StorageKey } from '~/libs/packages/storage/storage.js';

const signIn = createAsyncThunk<
  UserAuthResponse,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (payload, { extra }) => {
  const { authApi, storage } = extra;

  const { user, token } = await authApi.signIn(payload);

  await storage.set(StorageKey.TOKEN, token);

  return user;
});

const signUp = createAsyncThunk<
  UserAuthResponse,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (payload, { extra }) => {
  const { authApi, storage } = extra;

  const { user, token } = await authApi.signUp(payload);

  await storage.set(StorageKey.TOKEN, token);

  return user;
});

const getCurrentUser = createAsyncThunk<
  UserAuthResponse,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-current`, async (payload, { extra }) => {
  const { authApi } = extra;

  const user = await authApi.getCurrent();

  return user;
});

export { signIn, signUp, getCurrentUser };

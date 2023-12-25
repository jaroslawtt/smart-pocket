import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  type UserAuthResponse,
  type UserUpdateRequestDto,
} from '~/packages/users/libs/types/types.js';
import { AsyncThunkConfig } from '~/libs/types/async-thunk-config.type.js';
import { SliceName } from '~/libs/enums/enums.js';

const updateUserDetails = createAsyncThunk<
  UserAuthResponse,
  UserUpdateRequestDto,
  AsyncThunkConfig
>(`${SliceName.USERS}`, async (payload, { extra }) => {
  const { usersApi, notification } = extra;

  const user = await usersApi.updateUserDetails(payload);

  notification.success('Your details has been successfully saved');

  return user;
});

const updateUserProfilePicture = createAsyncThunk<
  UserAuthResponse,
  FormData,
  AsyncThunkConfig
>(`${SliceName.USERS}/update-profile-picture`, async (payload, { extra }) => {
  const { usersApi } = extra;
  const response = await usersApi.updateUserProfileImage(payload);

  return response;
});

export { updateUserDetails, updateUserProfilePicture };

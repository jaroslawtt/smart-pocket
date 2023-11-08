import { type UserAuthResponse } from '~/packages/users/libs/types/user-auth-response.type.js';

type UserSignUpResponseDto = {
  user: UserAuthResponse;
  token: string;
};

export { type UserSignUpResponseDto };

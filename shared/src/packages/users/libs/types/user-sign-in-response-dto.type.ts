import { type UserAuthResponse } from '~/packages/users/libs/types/user-auth-response.type.js';

type UserSignInResponseDto = {
  user: UserAuthResponse;
  token: string;
};

export { type UserSignInResponseDto };

import { UsersApi } from '~/packages/users/users-api.js';
import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

export {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
  type UserAuthResponse,
  type UserSignInResponseDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
export {
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from '~/packages/users/libs/validation-schemas/validation-schemas.js';

const usersApi = new UsersApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
  storage,
});

export { usersApi };

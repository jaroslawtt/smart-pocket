import { HttpApi } from '~/libs/packages/api/api.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import {
  type UserSignInResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
  UserAuthResponse,
} from '~/packages/users/users.js';
import { AuthApiPath } from '~/packages/auth/enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};
class AuthApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ baseUrl, http, storage, path: ApiPath.AUTH });
  }

  public async signIn(
    payload: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<UserSignInResponseDto>();
  }

  public async signUp(payload: UserSignUpRequestDto) {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<UserSignUpResponseDto>();
  }

  public async getCurrent(): Promise<UserAuthResponse> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.CURRENT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<UserAuthResponse>();
  }
}

export { AuthApi };

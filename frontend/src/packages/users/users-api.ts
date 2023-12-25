import { HttpApi } from '~/libs/packages/api/api.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import {
  type UserAuthResponse,
  type UserUpdateRequestDto,
} from '~/packages/users/libs/types/types.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { UsersApiPath } from '~/packages/users/libs/enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};
class UsersApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ baseUrl, http, storage, path: ApiPath.USERS });
  }

  async updateUserDetails(
    payload: UserUpdateRequestDto,
  ): Promise<UserAuthResponse> {
    const response = await this.load(
      this.getFullEndpoint(configureString(UsersApiPath.ROOT, {}), {}),
      {
        method: 'PUT',
        hasAuth: true,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );

    return response.json<UserAuthResponse>();
  }

  async updateUserProfileImage(payload: FormData): Promise<UserAuthResponse> {
    const response = await this.load(
      this.getFullEndpoint(configureString(UsersApiPath.UPDATE_IMAGE, {}), {}),
      {
        method: 'PUT',
        hasAuth: true,
        contentType: ContentType.FORM_DATA,
        payload,
      },
    );

    return response.json<UserAuthResponse>();
  }
}

export { UsersApi };

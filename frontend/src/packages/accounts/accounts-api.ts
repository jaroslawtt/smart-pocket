import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import {
  type AccountCreateRequestDto,
  type AccountGetAllItemResponseDto,
  type AccountGetAllResponseDto,
  AccountsApiPath,
  type AccountUpdateRequestDto,
} from '~/packages/accounts/accounts.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};
class AccountsApi extends HttpApi {
  constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.ACCOUNTS, baseUrl, storage, http });
  }

  async getAccounts() {
    const response = await this.load(
      this.getFullEndpoint(configureString(AccountsApiPath.ROOT, {}), {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<AccountGetAllResponseDto>();
  }

  async createAccount(payload: AccountCreateRequestDto) {
    const response = await this.load(
      this.getFullEndpoint(configureString(AccountsApiPath.ROOT, {}), {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        hasAuth: true,
        payload: JSON.stringify(payload),
      },
    );

    return await response.json<AccountGetAllItemResponseDto>();
  }

  async updateAccount(id: string, payload: AccountUpdateRequestDto) {
    const response = await this.load(
      this.getFullEndpoint(configureString(AccountsApiPath.$ID, { id }), {}),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        hasAuth: true,
        payload: JSON.stringify(payload),
      },
    );

    return await response.json<AccountGetAllItemResponseDto>();
  }

  async deleteAccount(id: string): Promise<void> {
    return void (await this.load(
      this.getFullEndpoint(configureString(AccountsApiPath.$ID, { id }), {}),
      {
        method: 'DELETE',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    ));
  }
}

export { AccountsApi };

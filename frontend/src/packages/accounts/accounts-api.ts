import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import {
  configureSearchParams,
  configureString,
} from '~/libs/helpers/helpers.js';
import {
  type AccountCreateRequestDto,
  type AccountFilterQueryDto,
  type AccountGetAllItemRequestParamsDto,
  type AccountGetAllItemResponseDto,
  type AccountGetAllResponseDto,
  AccountsApiPath,
  type AccountUpdateRequestDto,
} from '~/packages/accounts/accounts.js';
import {
  type RecordGetAllByAccountIdDtoResponse,
  type RecordGetAllResponseDto,
} from '~/packages/records/libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};
class AccountsApi extends HttpApi {
  constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.ACCOUNTS, baseUrl, storage, http });
  }

  async getAccounts(queryFilterParams?: AccountFilterQueryDto) {
    const queryParams = queryFilterParams
      ? configureSearchParams(queryFilterParams)
      : '';

    const response = await this.load(
      this.getFullEndpoint(
        configureString(AccountsApiPath.ROOT, {}),
        `?${queryParams.toString()}`,
        {},
      ),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<AccountGetAllResponseDto>();
  }

  async getAccountById(requestParams: AccountGetAllItemRequestParamsDto) {
    const response = await this.load(
      this.getFullEndpoint(
        configureString(AccountsApiPath.$ID, requestParams),
        {},
      ),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<AccountGetAllItemResponseDto>();
  }

  async getAccountRecords(queryRequestParam: {
    id: string;
  }): Promise<RecordGetAllByAccountIdDtoResponse> {
    const response = await this.load(
      this.getFullEndpoint(
        configureString(AccountsApiPath.$ID_RECORDS, {}),
        queryRequestParam,
      ),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<RecordGetAllByAccountIdDtoResponse>();
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
        contentType: ContentType.TEXT_PLAIN,
        hasAuth: true,
      },
    ));
  }
}

export { AccountsApi };

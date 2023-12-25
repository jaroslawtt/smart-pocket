import { AccountsApi } from '~/packages/accounts/accounts-api';
import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

const accountsApi = new AccountsApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
  storage,
});

export { accountsApi };
export {
  type AccountGetAllItemResponseDto,
  type AccountGetAllResponseDto,
  type AccountUpdateRequestDto,
  type AccountCreateRequestDto,
  type AccountFilterQueryDto,
  type AccountGetAllItemRequestParamsDto,
} from '~/packages/accounts/libs/types/types.js';
export {
  AccountsApiPath,
  AccountCurrencyValue,
} from '~/packages/accounts/libs/enums/enums.js';
export { createAccountValidationSchema } from '~/packages/accounts/libs/validation-schemas/validation-schemas.js';

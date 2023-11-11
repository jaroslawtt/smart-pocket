import { type AccountGetAllItemResponseDto } from '~/packages/accounts/libs/types/account-get-all-item-response-dto.type.js';

type AccountGetAllResponseDto = {
  items: AccountGetAllItemResponseDto[];
};

export { type AccountGetAllResponseDto };

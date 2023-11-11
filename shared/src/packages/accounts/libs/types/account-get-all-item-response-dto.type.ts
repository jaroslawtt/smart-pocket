import { ValueOf } from '~/libs/types/value-of.type';
import { AccountCurrencyValue } from '~/packages/accounts/libs/enums/enums.js';

type AccountGetAllItemResponseDto = {
  id: string;
  name: string;
  currency: ValueOf<typeof AccountCurrencyValue>;
  amount: number;
};

export { AccountGetAllItemResponseDto };

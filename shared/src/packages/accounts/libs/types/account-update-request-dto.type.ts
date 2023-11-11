import { type ValueOf } from '~/libs/types/types.js';
import { AccountCurrencyValue } from '~/packages/accounts/accounts.js';

type AccountUpdateRequestDto = {
  name: string;
  amount: number;
  currency: ValueOf<typeof AccountCurrencyValue>;
};

export { AccountUpdateRequestDto };

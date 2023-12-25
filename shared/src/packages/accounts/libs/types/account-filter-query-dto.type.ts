import { ValueOf } from '~/libs/types/value-of.type.js';
import { AccountSortValue } from '~/packages/accounts/libs/enums/account-sort-value.enum.js';

type AccountFilterQueryDto = {
  name?: string | undefined;
  sort?: ValueOf<typeof AccountSortValue> | undefined;
};

export { type AccountFilterQueryDto };

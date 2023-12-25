import { SelectOption } from '~/libs/types/select-option.type.js';
import { type ValueOf } from '~/libs/types/types.js';
import { AccountSortValue } from '~/packages/accounts/libs/enums/enums.js';

const accountSortValueToReadable = {
  [AccountSortValue.NAME_ASC]: 'A-Z',
  [AccountSortValue.NAME_DESC]: 'Z-A',
  [AccountSortValue.BALANCE_ASC]: 'Balance (lowest first)',
  [AccountSortValue.BALANCE_DESC]: 'Balance (highest first)',
} as const;

const OPTIONS: SelectOption<ValueOf<typeof AccountSortValue>>[] = Object.values(
  AccountSortValue,
).map((it) => ({
  value: it,
  label: accountSortValueToReadable[it],
}));

export { OPTIONS as options };

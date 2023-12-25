import { type AccountCreateRequestDto } from '~/packages/accounts/libs/types/types.js';
import { AccountCurrencyValue } from '~/packages/accounts/libs/enums/enums.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { type ValueOf } from '~/libs/types/types.js';

const OPTIONS: SelectOption<ValueOf<typeof AccountCurrencyValue>>[] =
  Object.values(AccountCurrencyValue).map((it) => ({
    value: it,
    label: it,
  }));

export { OPTIONS as options };

import joi from 'joi';
import {
  AccountCurrencyValue,
  AccountValidationMessage,
} from '~/packages/accounts/libs/enums/enums.js';
import { type AccountUpdateRequestDto } from '~/packages/accounts/libs/types/account-update-request-dto.type';

const updateAccount = joi.object<AccountUpdateRequestDto, true>({
  name: joi.string().required().messages({
    'string:empty': AccountValidationMessage.NAME_REQUIRE,
  }),
  amount: joi.number().precision(2).required().min(0).messages({
    'string:empty': AccountValidationMessage.AMOUNT_REQUIRE,
  }),
  currency: joi
    .string()
    .valid(...Object.values(AccountCurrencyValue))
    .messages({
      'string:empty': AccountValidationMessage.CURRENCY_REQUIRE,
    }),
});

export { updateAccount };

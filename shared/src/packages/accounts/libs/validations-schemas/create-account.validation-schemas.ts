import joi from 'joi';
import { type AccountCreateRequestDto } from '~/packages/accounts/libs/types/account-create-request-dto.type.js';
import {
  AccountCurrencyValue,
  AccountValidationMessage,
} from '~/packages/accounts/libs/enums/enums.js';

const createAccount = joi.object<AccountCreateRequestDto, true>({
  name: joi.string().required().messages({
    'string:empty': AccountValidationMessage.NAME_REQUIRE,
  }),
  amount: joi.number().required().min(0).messages({
    'string:empty': AccountValidationMessage.AMOUNT_REQUIRE,
  }),
  currency: joi.string().valid(...Object.values(AccountCurrencyValue)).messages({
    'string:empty': AccountValidationMessage.CURRENCY_REQUIRE,
  }),
});

export { createAccount };

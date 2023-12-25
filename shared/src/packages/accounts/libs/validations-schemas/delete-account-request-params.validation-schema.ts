import joi from 'joi';
import { type AccountDeleteRequestParamsDto } from '~/packages/accounts/libs/types/account-delete-request-params-dto.type.js';

const deleteAccountRequestParams = joi.object<
  AccountDeleteRequestParamsDto,
  true
>({
  id: joi.string().guid({ version: 'uuidv4' }).required(),
});

export { deleteAccountRequestParams };

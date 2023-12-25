import joi from 'joi';
import { type AccountUpdateRequestParamsDto } from '~/packages/accounts/libs/types/types.js';

const updateAccountRequestParams = joi.object<
  AccountUpdateRequestParamsDto,
  true
>({
  id: joi.string().guid({ version: 'uuidv4' }).required(),
});

export { updateAccountRequestParams };

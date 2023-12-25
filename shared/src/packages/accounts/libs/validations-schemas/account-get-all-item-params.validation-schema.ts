import joi from 'joi';
import { AccountGetAllItemRequestParamsDto } from '~/packages/accounts/libs/types/account-get-all-item-request-params-dto.type';

const accountGetAllItemParams = joi.object<
  AccountGetAllItemRequestParamsDto,
  true
>({
  id: joi.string().guid({ version: 'uuidv4' }).required(),
});

export { accountGetAllItemParams };

import joi from 'joi';
import { type RecordGetAllByAccountIdDto } from '~/packages/records/libs/types/record-get-all-by-account-id-dto.type.js';

const getAllByAccountId = joi.object<RecordGetAllByAccountIdDto, true>({
  accountId: joi.string().guid({ version: 'uuidv4' }).required(),
});

export { getAllByAccountId };

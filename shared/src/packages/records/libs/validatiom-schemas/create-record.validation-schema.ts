import joi from 'joi';
import { type RecordCreateRequestDto } from '~/packages/records/libs/types/record-create-request-dto.type.js';
import { RecordTypeValue } from '~/packages/records/records.js';

const createRecord = joi.object<RecordCreateRequestDto, true>({
  type: joi
    .string()
    .valid(...Object.values(RecordTypeValue))
    .required(),
  amount: joi.number().precision(2).min(0).required(),
  date: joi.string().allow('', null),
  payee: joi.string().allow('', null),
  place: joi.string().allow('', null),
  description: joi.string().allow('', null),
  accountId: joi.string().guid({ version: 'uuidv4' }).required(),
  categoryId: joi.number().min(0),
  toAccountId: joi.string().guid({ version: 'uuidv4' }),
});

export { createRecord };

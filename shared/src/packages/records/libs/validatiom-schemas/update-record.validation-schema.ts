import joi from 'joi';
import { RecordTypeValue } from '~/packages/records/libs/enums/record-type-value.enum.js';
import { RecordValidationMessage } from '~/packages/records/libs/enums/record-validation-message.enum.js';
import { type RecordUpdateRequestDto } from '~/packages/records/libs/types/record-update-request-dto.type.js';

const updateRecord = joi.object<RecordUpdateRequestDto, true>({
  type: joi
    .string()
    .valid(...Object.values(RecordTypeValue))
    .required(),
  amount: joi.number().precision(2).min(0).required(),
  date: joi.string().required().messages({
    'string:empty': RecordValidationMessage.DATE_REQUIRE,
  }),
  place: joi.string().allow('', null).required(),
  description: joi.string().allow('', null).required(),
  accountId: joi.string().guid({ version: 'uuidv4' }).allow(null),
  categoryId: joi.number().min(0).allow(null),
  fromAccountId: joi.string().guid({ version: 'uuidv4' }).allow(null),
  toAccountId: joi.string().guid({ version: 'uuidv4' }).allow(null),
});

export { updateRecord };

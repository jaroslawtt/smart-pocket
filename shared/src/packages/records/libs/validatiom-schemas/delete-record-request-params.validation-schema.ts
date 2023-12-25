import joi from 'joi';
import { type RecordDeleteRequestParamsDto } from '~/packages/records/libs/types/record-delete-request-params-dto.type.js';

const deleteRecordRequestParams = joi.object<
  RecordDeleteRequestParamsDto,
  true
>({
  id: joi.string().guid({ version: 'uuidv4' }).required(),
});

export { deleteRecordRequestParams };

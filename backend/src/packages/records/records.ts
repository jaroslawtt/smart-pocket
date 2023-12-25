import { RecordController } from '~/packages/records/record.controller.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { RecordService } from '~/packages/records/record.service.js';
import { RecordRepository } from '~/packages/records/record.repository.js';
import { RecordModel } from '~/packages/records/record.model.js';
import { accountRepository } from '~/packages/accounts/accounts.js';
export { RecordTypeValue } from './libs/enums/enums.js';
export { createRecordValidationSchema } from './libs/validation-schemas/validation-schemas.js';

const recordRepository = new RecordRepository(RecordModel);
const recordService = new RecordService(recordRepository, accountRepository);

const recordController = new RecordController(logger, recordService);

export { recordController, recordService };

import { ApiPath } from '~/libs/enums/enums.js';
import { RecordsApiPath } from '~/packages/records/libs/enums/enums.js';

const RecordCreateRoute = {
  PATH: `/api/v1${ApiPath.RECORDS}${RecordsApiPath.ROOT}`,
  METHOD: 'POST',
} as const;

export { RecordCreateRoute };

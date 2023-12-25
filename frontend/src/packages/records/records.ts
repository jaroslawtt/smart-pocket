import { RecordsApi } from '~/packages/records/records-api.js';
import { storage } from '~/libs/packages/storage/storage.js';
import { http } from '~/libs/packages/http/http.js';
import { config } from '~/libs/packages/config/config.js';

const recordsApi = new RecordsApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
  storage,
});

export { recordsApi };

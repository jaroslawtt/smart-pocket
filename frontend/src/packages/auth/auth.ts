import { AuthApi } from '~/packages/auth/auth-api.js';
import { config } from '~/libs/packages/config/config.js';
import { storage } from '~/libs/packages/storage/storage.js';
import { http } from '~/libs/packages/http/http.js';

const authApi = new AuthApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { authApi };

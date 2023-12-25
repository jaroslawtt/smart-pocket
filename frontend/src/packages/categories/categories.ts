import { storage } from '~/libs/packages/storage/storage.js';
import { http } from '~/libs/packages/http/http.js';
import { config } from '~/libs/packages/config/config.js';
import { CategoriesApi } from '~/packages/categories/categories-api.js';

const categoriesApi = new CategoriesApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  http,
  storage,
});

export { categoriesApi };

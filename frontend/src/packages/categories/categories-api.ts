import { HttpApi } from '~/libs/packages/api/api.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { type CategoryGetAllResponseDto } from '~/packages/categories/libs/types/types.js';
import { CategoriesApiPath } from '~/packages/categories/libs/enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class CategoriesApi extends HttpApi {
  public constructor({ baseUrl, storage, http }: Constructor) {
    super({ baseUrl, http, storage, path: ApiPath.CATEGORIES });
  }

  async getAllCategories(): Promise<CategoryGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(CategoriesApiPath.ROOT, {}),
      {
        method: 'GET',
        hasAuth: true,
        contentType: ContentType.TEXT_PLAIN,
      },
    );

    return response.json<CategoryGetAllResponseDto>();
  }
}

export { CategoriesApi };

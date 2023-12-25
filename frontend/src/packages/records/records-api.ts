import { HttpApi } from '~/libs/packages/api/api.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import {
    type RecordCreateRequestDto,
    type RecordDeleteRequestParamsDto,
    type RecordGetAllItemResponseDto,
    type RecordGetAllResponseDto,
} from '~/packages/records/libs/types/types.js';
import { RecordsApiPath } from '~/packages/records/libs/enums/enum.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};
class RecordsApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ baseUrl, http, storage, path: ApiPath.RECORDS });
  }

  async getAllRecords(): Promise<RecordGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(RecordsApiPath.ROOT, {}),
      {
        method: 'GET',
        hasAuth: true,
        contentType: ContentType.TEXT_PLAIN,
      },
    );

    return response.json<RecordGetAllResponseDto>();
  }

  async createRecord(
    payload: RecordCreateRequestDto,
  ): Promise<RecordGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(RecordsApiPath.ROOT, {}),
      {
        method: 'POST',
        hasAuth: true,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );

    return response.json<RecordGetAllItemResponseDto>();
  }

  async deleteRecord(payload: RecordDeleteRequestParamsDto): Promise<void> {
    return void (await this.load(
      this.getFullEndpoint(RecordsApiPath.$ID, payload),
      {
        method: 'DELETE',
        hasAuth: true,
        contentType: ContentType.TEXT_PLAIN,
      },
    ));
  }
}

export { RecordsApi };

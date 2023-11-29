import {
  ApiHandlerOptions,
  ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { RecordService } from '~/packages/records/record.service.js';
import { ILogger } from '~/libs/packages/logger/libs/interfaces/logger.interface';
import { RecordsApiPath } from '~/packages/records/libs/enums/enums.js';
import { ApiPath } from '~/libs/enums/enums.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import {
  type RecordCreateRequestDto,
  RecordUpdateRequestDto,
} from '~/packages/records/libs/types/types.js';
import { type UserAuthResponse } from '~/packages/users/libs/types/types.js';
import {
  createRecordValidationSchema,
  updateRecordValidationSchema,
} from '~/packages/records/libs/validation-schemas/validation-schemas.js';

class RecordController extends Controller {
  private readonly recordService: RecordService;

  public constructor(logger: ILogger, recordService: RecordService) {
    super(logger, ApiPath.RECORDS);

    this.recordService = recordService;

    this.addRoute({
      path: RecordsApiPath.ROOT,
      method: 'GET',
      handler: (options) =>
        this.findByUserId(
          options as ApiHandlerOptions<{ user: UserAuthResponse }>,
        ),
    });

    this.addRoute({
      path: RecordsApiPath.$ID,
      method: 'GET',
      handler: (options) =>
        this.find(options as ApiHandlerOptions<{ params: { id: string } }>),
    });

    this.addRoute({
      path: RecordsApiPath.ROOT,
      method: 'POST',
      validation: { body: createRecordValidationSchema },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{ body: RecordCreateRequestDto }>,
        ),
    });

    this.addRoute({
      path: RecordsApiPath.$ID,
      method: 'PUT',
      validation: { body: updateRecordValidationSchema },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: RecordUpdateRequestDto;
            params: { id: string };
          }>,
        ),
    });

    this.addRoute({
      path: RecordsApiPath.$ID,
      method: 'DELETE',
      handler: (options) =>
        this.delete(
          options as ApiHandlerOptions<{
            params: { id: string };
          }>,
        ),
    });
  }

  private async create(
    options: ApiHandlerOptions<{
      body: RecordCreateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.recordService.create(options.body),
    };
  }

  private async find(
    options: ApiHandlerOptions<{
      params: { id: string };
    }>,
  ): Promise<ApiHandlerResponse> {
    const {
      params: { id },
    } = options;

    return {
      status: HttpCode.OK,
      payload: await this.recordService.find(id),
    };
  }

  private async findByUserId(
    options: ApiHandlerOptions<{
      user: UserAuthResponse;
    }>,
  ): Promise<ApiHandlerResponse> {
    const { id: userId } = options.user;

    return {
      status: HttpCode.OK,
      payload: await this.recordService.findByUserId(userId),
    };
  }

  private async update(
    options: ApiHandlerOptions<{
      body: RecordUpdateRequestDto;
      params: { id: string };
    }>,
  ): Promise<ApiHandlerResponse> {
    const {
      body,
      params: { id },
    } = options;
    return {
      status: HttpCode.OK,
      payload: await this.recordService.update({ id, payload: body }),
    };
  }

  private async delete(
    options: ApiHandlerOptions<{ params: { id: string } }>,
  ): Promise<ApiHandlerResponse> {
    const {
      params: { id },
    } = options;

    return {
      status: HttpCode.NO_CONTENT,
      payload: await this.recordService.delete(id),
    };
  }
}

export { RecordController };

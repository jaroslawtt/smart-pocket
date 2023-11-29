import {
  ApiHandlerOptions,
  ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { ILogger } from '~/libs/packages/logger/libs/interfaces/logger.interface.js';
import { ApiPath } from '~/libs/enums/enums.js';
import { SubcategoryService } from '~/packages/subcategories/subcategory.service.js';
import { type UserAuthResponse } from '~/packages/users/libs/types/types.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { SubcategoriesApiPath } from '~/packages/subcategories/libs/enums/enums.js';
import {
  type SubcategoryCreateRequestDto,
  type SubcategoryUpdateRequestDto,
} from '~/packages/subcategories/libs/types/types';
import {
  createSubcategoryValidationSchema,
  updateSubcategoryValidationSchema,
} from '~/packages/subcategories/libs/validation-schemas/validation-schemas.js';

class SubcategoryController extends Controller {
  private readonly subcategoryService: SubcategoryService;
  public constructor(logger: ILogger, subcategoryService: SubcategoryService) {
    super(logger, ApiPath.SUBCATEGORIES);

    this.subcategoryService = subcategoryService;

    this.addRoute({
      path: SubcategoriesApiPath.$ID,
      method: 'GET',
      handler: (options) =>
        this.find(options as ApiHandlerOptions<{ params: { id: number } }>),
    });

    this.addRoute({
      path: SubcategoriesApiPath.ROOT,
      method: 'POST',
      validation: { body: createSubcategoryValidationSchema },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            body: SubcategoryCreateRequestDto;
            user: UserAuthResponse;
          }>,
        ),
    });

    this.addRoute({
      path: SubcategoriesApiPath.$ID,
      method: 'PUT',
      validation: { body: updateSubcategoryValidationSchema },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: SubcategoryUpdateRequestDto;
            user: UserAuthResponse;
            params: { id: number };
          }>,
        ),
    });

    this.addRoute({
      path: SubcategoriesApiPath.$ID,
      method: 'DELETE',
      handler: (options) =>
        this.delete(
          options as ApiHandlerOptions<{
            params: { id: number };
          }>,
        ),
    });
  }

  private async find(
    options: ApiHandlerOptions<{ params: { id: number } }>,
  ): Promise<ApiHandlerResponse> {
    const { id } = options.params;

    return {
      status: HttpCode.OK,
      payload: await this.subcategoryService.find(id),
    };
  }

  private async create(
    options: ApiHandlerOptions<{
      body: SubcategoryCreateRequestDto;
      user: UserAuthResponse;
    }>,
  ): Promise<ApiHandlerResponse> {
    const {
      body,
      user: { id: userId },
    } = options;

    return {
      status: HttpCode.CREATED,
      payload: await this.subcategoryService.create({
        ...body,
        userId,
      }),
    };
  }

  private async update(
    options: ApiHandlerOptions<{
      body: SubcategoryUpdateRequestDto;
      user: UserAuthResponse;
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    const {
      params: { id },
      body,
      user: { id: userId },
    } = options;

    return {
      status: HttpCode.OK,
      payload: await this.subcategoryService.update({
        id,
        ...body,
        userId,
      }),
    };
  }

  private async delete(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    const {
      params: { id },
    } = options;

    return {
      status: HttpCode.NO_CONTENT,
      payload: await this.subcategoryService.delete(id),
    };
  }
}

export { SubcategoryController };

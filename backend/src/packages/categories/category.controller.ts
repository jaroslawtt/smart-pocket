import {
  ApiHandlerOptions,
  ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { CategoryService } from '~/packages/categories/category.service.js';
import { ILogger } from '~/libs/packages/logger/libs/interfaces/logger.interface.js';
import { ApiPath } from '~/libs/enums/enums.js';
import { type UserAuthResponse } from '~/packages/users/libs/types/types.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { CategoriesApiPath } from '~/packages/categories/libs/enums/enums.js';

class CategoryController extends Controller {
  private readonly categoryService: CategoryService;

  public constructor(logger: ILogger, categoryService: CategoryService) {
    super(logger, ApiPath.CATEGORIES);

    this.categoryService = categoryService;

    this.addRoute({
      path: CategoriesApiPath.ROOT,
      method: 'GET',
      handler: (options) =>
        this.findByUserId(
          options as ApiHandlerOptions<{ user: UserAuthResponse }>,
        ),
    });
  }

  private async findByUserId(
    options: ApiHandlerOptions<{ user: UserAuthResponse }>,
  ): Promise<ApiHandlerResponse> {
    const {
      user: { id: userId },
    } = options;

    return {
      status: HttpCode.OK,
      payload: await this.categoryService.findByUserId(userId),
    };
  }
}

export { CategoryController };

import {
  ApiHandlerOptions,
  ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { ILogger } from '~/libs/packages/logger/libs/interfaces/logger.interface';
import { type UserService } from '~/packages/users/user.service.js';
import { ApiPath } from '~/libs/enums/enums.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { UsersApiPath } from '~/packages/users/libs/enums/enums.js';
import {
  type UserUpdateLoginRequestDto,
  type UserUpdatePasswordRequestDto,
  type UserUpdateRequestDto,
} from '~/packages/users/libs/types/types.js';
import {
  userUpdateLoginValidationSchema,
  userUpdatePasswordValidationSchema,
  userUpdateValidationSchema,
} from '~/packages/users/libs/validation-schemas/validation-schemas.js';

class UserController extends Controller {
  private readonly userService: UserService;
  public constructor(logger: ILogger, userService: UserService) {
    super(logger, ApiPath.USERS);

    this.userService = userService;

    this.addRoute({
      path: UsersApiPath.ROOT,
      method: 'GET',
      handler: () => this.findAll(),
    });

    this.addRoute({
      path: UsersApiPath.$ID_UPDATE_PASSWORD,
      method: 'POST',
      validation: { body: userUpdatePasswordValidationSchema },
      handler: (options) =>
        this.updatePassword(
          options as ApiHandlerOptions<{
            params: { id: string };
            body: UserUpdatePasswordRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.$ID_UPDATE_LOGIN,
      method: 'POST',
      validation: { body: userUpdateLoginValidationSchema },
      handler: (options) =>
        this.updateLogin(
          options as ApiHandlerOptions<{
            params: { id: string };
            body: UserUpdateLoginRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.$ID,
      method: 'PUT',
      validation: { body: userUpdateValidationSchema },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            params: { id: string };
            body: UserUpdateRequestDto;
          }>,
        ),
    });
  }

  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.findAll(),
    };
  }

  private async update(
    options: ApiHandlerOptions<{
      params: { id: string };
      body: UserUpdateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    const {
      params: { id },
      body: payload,
    } = options;

    return {
      status: HttpCode.OK,
      payload: await this.userService.update({
        id,
        payload,
      }),
    };
  }

  private async updateLogin(
    options: ApiHandlerOptions<{
      params: { id: string };
      body: UserUpdateLoginRequestDto;
    }>,
  ) {
    const { id } = options.params;

    return {
      status: HttpCode.OK,
      payload: await this.userService.updateLogin(id, options.body),
    };
  }

  private async updatePassword(
    options: ApiHandlerOptions<{
      params: { id: string };
      body: UserUpdatePasswordRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    const { id } = options.params;

    return {
      status: HttpCode.OK,
      payload: await this.userService.updatePassword(id, options.body),
    };
  }
}

export { UserController };

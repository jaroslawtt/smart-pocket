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
  UserAuthResponse,
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
      path: UsersApiPath.UPDATE_PASSWORD,
      method: 'PUT',
      validation: { body: userUpdatePasswordValidationSchema },
      handler: (options) =>
        this.updatePassword(
          options as ApiHandlerOptions<{
            user: UserAuthResponse;
            body: UserUpdatePasswordRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.UPDATE_LOGIN,
      method: 'PUT',
      validation: { body: userUpdateLoginValidationSchema },
      handler: (options) =>
        this.updateLogin(
          options as ApiHandlerOptions<{
            user: UserAuthResponse;
            body: UserUpdateLoginRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.UPDATE_IMAGE,
      method: 'PUT',
      handler: (options) =>
        this.updateImage(
          options as ApiHandlerOptions<{
            user: UserAuthResponse;
            fileBuffer: Buffer;
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.ROOT,
      method: 'PUT',
      validation: { body: userUpdateValidationSchema },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            user: UserAuthResponse;
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
      user: UserAuthResponse;
      body: UserUpdateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    const {
      user: { id },
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

  private async updateLogin({
    body,
    user,
  }: ApiHandlerOptions<{
    user: UserAuthResponse;
    body: UserUpdateLoginRequestDto;
  }>) {
    return {
      status: HttpCode.OK,
      payload: await this.userService.updateLogin(user.id, body),
    };
  }

  private async updatePassword({
    body,
    user,
  }: ApiHandlerOptions<{
    user: UserAuthResponse;
    body: UserUpdatePasswordRequestDto;
  }>): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.updatePassword(user.id, body),
    };
  }

  private async updateImage({
    user,
    fileBuffer,
  }: ApiHandlerOptions<{
    user: UserAuthResponse;
    fileBuffer: Buffer;
  }>): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.updateAvatar(user.id, fileBuffer),
    };
  }
}

export { UserController };

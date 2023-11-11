import {
  ApiHandlerOptions,
  ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { ILogger } from '~/libs/packages/logger/libs/interfaces/logger.interface.js';
import { AccountService } from '~/packages/accounts/account.service.js';
import { ApiPath } from '~/libs/enums/enums.js';
import {
  type AccountCreateRequestDto,
  type AccountUpdateRequestDto,
} from '~/packages/accounts/libs/types/types.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { AccountsApiPath } from '~/packages/accounts/libs/enums/enums.js';
import { UserAuthResponse } from '~/packages/users/libs/types/types.js';
import {
  createAccountValidationSchema,
  updateAccountValidationSchema,
} from '~/packages/accounts/libs/validation-schemas/validation-schemas.js';

class AccountController extends Controller {
  private readonly accountService: AccountService;
  public constructor(logger: ILogger, accountService: AccountService) {
    super(logger, ApiPath.ACCOUNTS);
    this.accountService = accountService;

    this.addRoute({
      path: AccountsApiPath.ROOT,
      method: 'GET',
      handler: (options) =>
        this.findByUserId(
          options as ApiHandlerOptions<{ user: UserAuthResponse }>,
        ),
    });

    this.addRoute({
      path: AccountsApiPath.$ID,
      method: 'GET',
      handler: (options) =>
        this.find(options as ApiHandlerOptions<{ params: { id: string } }>),
    });

    this.addRoute({
      path: AccountsApiPath.ROOT,
      method: 'POST',
      validation: { body: createAccountValidationSchema },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            user: UserAuthResponse;
            body: AccountCreateRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: AccountsApiPath.$ID,
      method: 'PUT',
      validation: { body: updateAccountValidationSchema },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            params: { id: string };
            body: AccountUpdateRequestDto;
            user: UserAuthResponse;
          }>,
        ),
    });

    this.addRoute({
      path: AccountsApiPath.$ID,
      method: 'DELETE',
      handler: (options) =>
        this.delete(options as ApiHandlerOptions<{ params: { id: string } }>),
    });
  }

  private async find(options: ApiHandlerOptions<{ params: { id: string } }>) {
    const { id } = options.params;

    return {
      status: HttpCode.OK,
      payload: await this.accountService.find(id),
    };
  }

  private async findByUserId(
    options: ApiHandlerOptions<{ user: UserAuthResponse }>,
  ): Promise<ApiHandlerResponse> {
    const { id: userId } = options.user;

    return {
      status: HttpCode.OK,
      payload: await this.accountService.findByUserId(userId),
    };
  }

  private async create(
    options: ApiHandlerOptions<{
      body: AccountCreateRequestDto;
      user: UserAuthResponse;
    }>,
  ): Promise<ApiHandlerResponse> {
    const {
      user: { id: userId },
      body: payload,
    } = options;

    return {
      status: HttpCode.CREATED,
      payload: await this.accountService.create({ userId, payload }),
    };
  }

  private async update(
    options: ApiHandlerOptions<{
      params: { id: string };
      body: AccountUpdateRequestDto;
      user: UserAuthResponse;
    }>,
  ) {
    const {
      user: { id: userId },
      params: { id },
      body: payload,
    } = options;

    return {
      status: HttpCode.OK,
      payload: await this.accountService.update({
        id,
        userId,
        payload,
      }),
    };
  }

  private async delete(
    options: ApiHandlerOptions<{ params: { id: string } }>,
  ): Promise<ApiHandlerResponse> {
    const { id } = options.params;

    return {
      status: HttpCode.NO_CONTENT,
      payload: await this.accountService.delete(id),
    };
  }
}

export { AccountController };

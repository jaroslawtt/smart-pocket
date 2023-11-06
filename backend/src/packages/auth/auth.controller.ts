import {
  ApiHandlerOptions,
  ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { ILogger } from '~/libs/packages/logger/libs/interfaces/logger.interface.js';
import { type AuthService } from '~/packages/auth/auth.service.js';
import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/libs/types/types.js';
import { ApiPath } from '~/libs/enums/enums.js';
import { HttpCode } from '~/libs/packages/http/libs/enums/enums.js';
import { AuthApiPath } from '~/packages/auth/libs/enums/enums.js';
import {
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from '~/packages/users/libs/validation-schemas/validation-schemas.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';

class AuthController extends Controller {
  private readonly authService: AuthService;
  public constructor(logger: ILogger, authService: AuthService) {
    super(logger, ApiPath.AUTH);

    this.authService = authService;

    this.addRoute({
      path: AuthApiPath.CURRENT,
      method: 'GET',
      handler: (options) => this.getCurrent(options as ApiHandlerOptions),
    });

    this.addRoute({
      path: AuthApiPath.SIGN_UP,
      method: 'POST',
      validation: { body: userSignUpValidationSchema },
      handler: (options) =>
        this.signUp(
          options as ApiHandlerOptions<{ body: UserSignUpRequestDto }>,
        ),
    });

    this.addRoute({
      path: AuthApiPath.SIGN_IN,
      method: 'POST',
      validation: { body: userSignInValidationSchema },
      handler: (options) =>
        this.signIn(
          options as ApiHandlerOptions<{ body: UserSignInRequestDto }>,
        ),
    });
  }

  private async getCurrent(
    options: ApiHandlerOptions,
  ): Promise<ApiHandlerResponse> {
    const [, token] = options.headers.authorization?.split(' ') ?? [];

    if (!token) {
      throw new HttpError({
        message:
          'You should provide Authorization header in format: Bearer <token>',
        status: HttpCode.UNAUTHORIZED,
      });
    }

    return {
      status: HttpCode.OK,
      payload: await this.authService.getCurrent(token),
    };
  }

  private async signUp(
    options: ApiHandlerOptions<{ body: UserSignUpRequestDto }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.signUp(options.body),
    };
  }

  private async signIn(
    options: ApiHandlerOptions<{ body: UserSignInRequestDto }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.authService.signIn(options.body),
    };
  }
}

export { AuthController };

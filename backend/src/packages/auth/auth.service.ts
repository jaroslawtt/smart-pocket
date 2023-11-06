import {
  UserGetAllItemResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
  type UserTokenPayload,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IToken } from '~/libs/packages/token/libs/interfaces/token.interface.js';
import { type UserPrivateData } from '~/packages/users/libs/types/user-private-data.type.js';
import { type IEncrypt } from '~/libs/packages/encrypt/libs/interfaces/encrypt.interface.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class AuthService {
  private readonly userService: UserService;
  private readonly token: IToken;
  private readonly encrypt: IEncrypt;
  public constructor(
    userService: UserService,
    token: IToken,
    encrypt: IEncrypt,
  ) {
    this.userService = userService;
    this.token = token;
    this.encrypt = encrypt;
  }
  public async signUp(payload: UserSignUpRequestDto) {
    const isUserExist = await this.userService.findByEmail(payload.email);

    if (isUserExist)
      throw new ApplicationError({
        message: 'User with this email address already exists.',
      });

    const user = await this.userService.create(payload);
    const token = await this.token.create({
      userId: user.id,
    });

    return {
      user,
      token,
    };
  }

  public async signIn(payload: UserSignInRequestDto) {
    const { password, email } = payload;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new ApplicationError({
        message: 'User with this email does not exist.',
      });
    }

    const userPrivateData = (await this.userService.findPrivateData(
      user.toObject().id,
    )) as UserPrivateData;

    const hasSamePassword = await this.encrypt.compare({
      data: password,
      salt: userPrivateData.passwordSalt,
      passwordHash: userPrivateData.passwordHash,
    });

    if (!hasSamePassword) {
      throw new ApplicationError({
        message: 'Password is not correct!',
      });
    }

    return {
      token: await this.token.create<UserTokenPayload>({
        userId: user.toObject().id,
      }),
      user,
    };
  }

  public async getCurrent(token: string): Promise<UserGetAllItemResponseDto> {
    const { userId } = this.token.decode<UserTokenPayload>(token);

    if (!userId) {
      throw new HttpError({
        message: 'Invalid token',
        status: HttpCode.UNAUTHORIZED,
      });
    }

    const user = await this.userService.find(userId);

    if (!user) {
      throw new HttpError({
        message: 'User not found',
        status: HttpCode.NOT_FOUND,
      });
    }

    return user.toObject();
  }
}

export { AuthService };

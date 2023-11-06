import { type IService } from '~/libs/interfaces/service.interface.js';
import { type UserRepository } from '~/packages/users/user.repository.js';
import { type IEncrypt } from '~/libs/packages/encrypt/libs/interfaces/encrypt.interface.js';
import { type IConfig } from '~/libs/packages/config/libs/interfaces/config.interface.js';
import {
  type UserAuthResponse,
  type UserGetAllItemResponseDto,
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
  type UserUpdateRequestDto,
  type UserUpdatePasswordRequestDto,
  type UserUpdateLoginRequestDto,
} from './libs/types/types.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserPrivateData } from '~/packages/users/libs/types/user-private-data.type.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';

class UserService implements IService {
  private readonly userRepository: UserRepository;

  private readonly config: IConfig;

  private readonly encrypt: IEncrypt;

  public constructor(
    userRepository: UserRepository,
    config: IConfig,
    encrypt: IEncrypt,
  ) {
    this.userRepository = userRepository;
    this.config = config;
    this.encrypt = encrypt;
  }

  async create(payload: UserSignUpRequestDto): Promise<UserAuthResponse> {
    const passwordSalt = await this.encrypt.generateSalt(
      this.config.ENCRYPTION.USER_PASSWORD_SALT_ROUNDS,
    );
    const passwordHash = await this.encrypt.encrypt(
      payload.password,
      passwordSalt,
    );

    const user = await this.userRepository.create(
      UserEntity.initializeNew({
        passwordSalt,
        passwordHash,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        username: payload.username,
      }),
    );

    return user.toObject();
  }

  async delete(payload: string): Promise<void> {
    return void this.userRepository.delete(payload);
  }

  async find(payload: string): Promise<UserEntity | null> {
    return this.userRepository.find(payload);
  }

  async findByEmail(payload: string) {
    return this.userRepository.findByEmail({ email: payload });
  }

  async findPrivateData(payload: string) {
    const user = await this.userRepository.find(payload);

    if (!user) return null;

    return user.privateData;
  }

  async findAll(): Promise<UserGetAllResponseDto> {
    const users = await this.userRepository.findAll();
    return {
      items: users.map((it) => it.toObject()),
    };
  }

  async update(
    id: string,
    payload: UserUpdateRequestDto,
  ): Promise<UserGetAllItemResponseDto> {
    const user = await this.userRepository.update(
      UserEntity.initialize({
        id,
        email: null,
        firstName: payload.firstName,
        lastName: payload.lastName,
        username: payload.username,
        passwordHash: null,
        passwordSalt: null,
      }),
    );

    return user.toObject();
  }

  async updatePassword(
    id: string,
    payload: UserUpdatePasswordRequestDto,
  ): Promise<UserGetAllItemResponseDto> {
    const userPrivateData = (await this.findPrivateData(id)) as UserPrivateData;
    const hasSamePassword = await this.encrypt.compare({
      data: payload.password,
      salt: userPrivateData.passwordSalt,
      passwordHash: userPrivateData.passwordHash,
    });

    if (!hasSamePassword) {
      throw new ApplicationError({
        message: 'Password is not correct!',
      });
    }

    const passwordSalt = await this.encrypt.generateSalt(
      this.config.ENCRYPTION.USER_PASSWORD_SALT_ROUNDS,
    );
    const passwordHash = await this.encrypt.encrypt(
      payload.newPassword,
      passwordSalt,
    );

    const user = await this.userRepository.updatePassword(
      UserEntity.initialize({
        id,
        email: null,
        passwordSalt,
        passwordHash,
        username: null,
        lastName: null,
        firstName: null,
      }),
    );

    return user.toObject();
  }

  async updateLogin(id: string, payload: UserUpdateLoginRequestDto) {
    const { login: email } = payload;

    const user = await this.userRepository.findByEmail({ email });

    if (user) {
      throw new ApplicationError({
        message: 'Email is already used!',
      });
    }

    const updatedUser = await this.userRepository.updateLogin(
      UserEntity.initialize({
        id,
        firstName: null,
        lastName: null,
        username: null,
        email,
        passwordHash: null,
        passwordSalt: null,
      }),
    );

    return updatedUser.toObject();
  }
}

export { UserService };

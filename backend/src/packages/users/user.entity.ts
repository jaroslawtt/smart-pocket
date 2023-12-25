import { IEntity } from '~/libs/interfaces/entity.interface.js';

class UserEntity implements IEntity {
  private readonly 'id': string | null;

  private readonly 'email': string | null;

  private readonly 'passwordHash': string | null;

  private readonly 'passwordSalt': string | null;

  private readonly 'firstName': string | null;

  private readonly 'lastName': string | null;

  private readonly 'username': string | null;

  private 'avatarId': number | null;

  private 'avatarUrl': string | null;

  private constructor({
    id,
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    username,
    avatarId,
    avatarUrl,
  }: {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    passwordSalt: string | null;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    avatarId: number | null;
    avatarUrl: string | null;
  }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.avatarId = avatarId;
    this.avatarUrl = avatarUrl;
  }

  public get privateData(): {
    passwordHash: string;
    passwordSalt: string;
  } {
    return {
      passwordHash: this.passwordHash as string,
      passwordSalt: this.passwordSalt as string,
    };
  }

  public static initialize({
    id,
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    username,
    avatarId,
    avatarUrl,
  }: {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    passwordSalt: string | null;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    avatarId: number | null;
    avatarUrl: string | null;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      username,
      avatarId,
      avatarUrl,
    });
  }

  public static initializeNew({
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    username,
  }: {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
    username: string;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      username,
      avatarId: null,
      avatarUrl: null,
    });
  }

  toNewObject(): {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
    username: string;
  } {
    return {
      email: this.email as string,
      passwordHash: this.passwordHash as string,
      passwordSalt: this.passwordSalt as string,
      firstName: this.firstName as string,
      lastName: this.lastName as string,
      username: this.username as string,
    };
  }

  toObject(): {
    id: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarUrl: string | null;
  } {
    return {
      id: this.id as string,
      email: this.email as string,
      passwordHash: this.passwordHash as string,
      passwordSalt: this.passwordSalt as string,
      firstName: this.firstName as string,
      lastName: this.lastName as string,
      username: this.username as string,
      avatarUrl: this.avatarUrl,
    };
  }

  public toUserAvatar(): {
    id: string;
    avatarId: number;
  } {
    return {
      id: this.id as string,
      avatarId: this.avatarId as number,
    };
  }
}

export { UserEntity };

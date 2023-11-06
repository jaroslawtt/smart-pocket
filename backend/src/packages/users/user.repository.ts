import { IRepository } from '~/libs/interfaces/repository.interface.js';
import { UserModel } from '~/packages/users/user.model.js';
import { UserEntity } from '~/packages/users/user.entity.js';

class UserRepository implements IRepository {
  private readonly userModel: typeof UserModel;

  private readonly defaultRelationExpression = 'userDetails';

  constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  async create(payload: UserEntity): Promise<UserEntity> {
    const { email, firstName, lastName, passwordSalt, passwordHash, username } =
      payload.toNewObject();

    const user = await this.userModel
      .query()
      .insertGraphAndFetch({
        email,
        passwordSalt,
        passwordHash,
        userDetails: {
          firstName,
          lastName,
          username,
        },
      })
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordSalt: user.passwordSalt,
      passwordHash: user.passwordHash,
      username: user.userDetails.username,
    });
  }

  async findByEmail({ email }: { email: string }): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .findOne({
        email,
      })
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    if (!user) return null;

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordSalt: user.passwordSalt,
      passwordHash: user.passwordHash,
      username: user.userDetails.username,
    });
  }

  async delete(id: string): Promise<void> {
    return void (await this.userModel.query().deleteById(id));
  }

  async find(id: string): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .findById(id)
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    if (!user) return null;

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordSalt: user.passwordSalt,
      passwordHash: user.passwordHash,
      username: user.userDetails.username,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel
      .query()
      .select()
      .withGraphJoined(this.defaultRelationExpression);

    return users.map((user) => {
      return UserEntity.initialize({
        id: user.id,
        email: user.email,
        firstName: user.userDetails.firstName,
        lastName: user.userDetails.lastName,
        passwordSalt: user.passwordSalt,
        passwordHash: user.passwordHash,
        username: user.userDetails.username,
      });
    });
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    const { id, firstName, lastName, username } = entity.toObject();

    await this.userModel
      .relatedQuery(this.defaultRelationExpression)
      .for(id)
      .patch({ firstName, lastName, username });

    const user = (await this.userModel
      .query()
      .findById(id)
      .withGraphFetched(this.defaultRelationExpression)) as UserModel;

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordSalt: user.passwordSalt,
      passwordHash: user.passwordHash,
      username: user.userDetails.username,
    });
  }

  async updatePassword(entity: UserEntity): Promise<UserEntity> {
    const { id, passwordSalt, passwordHash } = entity.toObject();

    const user = await this.userModel
      .query()
      .updateAndFetchById(id, {
        passwordHash,
        passwordSalt,
      })
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordSalt: user.passwordSalt,
      passwordHash: user.passwordHash,
      username: user.userDetails.username,
    });
  }

  async updateLogin(entity: UserEntity): Promise<UserEntity> {
    const { id, email } = entity.toObject();

    const user = await this.userModel
      .query()
      .updateAndFetchById(id, {
        email,
      })
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordSalt: user.passwordSalt,
      passwordHash: user.passwordHash,
      username: user.userDetails.username,
    });
  }
}

export { UserRepository };

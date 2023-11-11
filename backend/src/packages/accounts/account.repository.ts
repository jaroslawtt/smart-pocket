import { IRepository } from '~/libs/interfaces/repository.interface.js';
import { AccountModel } from '~/packages/accounts/account.model.js';
import { AccountEntity } from '~/packages/accounts/account.entity.js';

class AccountRepository implements Omit<IRepository, 'findAll'> {
  private readonly accountModel: typeof AccountModel;

  constructor(accountModel: typeof AccountModel) {
    this.accountModel = accountModel;
  }
  async create(payload: AccountEntity): Promise<AccountEntity> {
    const { userId, name, amount, currency } = payload.toNewObject();

    const account = await this.accountModel
      .query()
      .insert({ userId, name, amount, currency })
      .returning('*')
      .execute();

    return AccountEntity.initialize({
      id: account.id,
      userId: account.userId,
      name: account.name,
      amount: account.amount,
      currency: account.currency,
    });
  }

  async delete(id: string): Promise<void> {
    return void (await this.accountModel.query().deleteById(id));
  }

  async find(id: string): Promise<AccountEntity | null> {
    const account = await this.accountModel.query().findById(id).execute();

    if (!account) {
      return null;
    }

    return AccountEntity.initialize({
      id: account.id,
      userId: account.userId,
      name: account.name,
      amount: account.amount,
      currency: account.currency,
    });
  }

  async findByUserId(userId: string): Promise<AccountEntity[]> {
    const accounts = await this.accountModel
      .query()
      .where('userId', userId)
      .execute();

    return accounts.map((account) =>
      AccountEntity.initialize({
        id: account.id,
        userId: account.userId,
        name: account.name,
        amount: account.amount,
        currency: account.currency,
      }),
    );
  }

  async update(payload: AccountEntity): Promise<AccountEntity> {
    const { id, userId, name, amount, currency } = payload.toObject();

    const account = await this.accountModel
      .query()
      .patchAndFetchById(id, { userId, name, amount, currency });

    return AccountEntity.initialize({
      id: account.id,
      userId: account.userId,
      name: account.name,
      amount: account.amount,
      currency: account.currency,
    });
  }
}

export { AccountRepository };

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

  async produceExpense({
    amount,
    accountId,
  }: {
    accountId: string;
    amount: number;
  }): Promise<void> {
    const account = ((await this.find(accountId)) as AccountEntity).toObject();

    return void (await this.update(
      AccountEntity.initialize({
        ...account,
        amount: +(account.amount - amount).toFixed(2),
      }),
    ));
  }

  async produceIncome({
    amount,
    accountId,
  }: {
    accountId: string;
    amount: number;
  }): Promise<void> {
    const account = ((await this.find(accountId)) as AccountEntity).toObject();

    return void (await this.update(
      AccountEntity.initialize({
        ...account,
        amount: +(account.amount + amount).toFixed(2),
      }),
    ));
  }

  async transferMoney({
    toAccountId,
    fromAccountId,
    amount,
  }: {
    fromAccountId: string;
    toAccountId: string;
    amount: number;
  }): Promise<void> {
    const senderAccount = (
      (await this.find(fromAccountId)) as AccountEntity
    ).toObject();
    const receiverAccount = (
      (await this.find(toAccountId)) as AccountEntity
    ).toObject();

    await this.update(
      AccountEntity.initialize({
        ...senderAccount,
        amount: +(senderAccount.amount - amount).toFixed(2),
      }),
    );

    return void (await this.update(
      AccountEntity.initialize({
        ...receiverAccount,
        amount: +(receiverAccount.amount + amount).toFixed(2),
      }),
    ));
  }
}

export { AccountRepository };

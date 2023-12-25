import { IRepository } from '~/libs/interfaces/repository.interface.js';
import { AccountModel } from '~/packages/accounts/account.model.js';
import { AccountEntity } from '~/packages/accounts/account.entity.js';
import { type AccountFilterQueryDto } from '~/packages/accounts/libs/types/types.js';
import { AccountSortValue } from '~/packages/accounts/libs/enums/enums.js';
import { SortDirection } from '~/libs/enums/enums.js';
import { RecordEntity } from '~/packages/records/record.entity.js';
import { SubcategoryEntity } from '~/packages/subcategories/subcategory.entity.js';

class AccountRepository implements Omit<IRepository, 'findAll'> {
  private readonly accountModel: typeof AccountModel;
  private readonly defaultRelationExpression = 'records';
  private readonly recordDetailsRelationExpression = 'recordDetails';
  private readonly categoryRelationExpression = 'subcategory';

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
      records: null,
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
      records: null,
    });
  }

  async findByUserId(
    userId: string,
    parameters: AccountFilterQueryDto,
  ): Promise<AccountEntity[]> {
    const { name, sort } = parameters;

    const query = this.accountModel
      .query()
      .where('userId', userId)
      .andWhere((builder) => {
        if (name) {
          void builder.where('name', 'ilike', `%${name}%`);
        }
      });

    switch (sort) {
      case AccountSortValue.NAME_DESC:
        query.orderBy('name', SortDirection.DESCENDING);
        break;
      case AccountSortValue.BALANCE_ASC:
        query.orderBy('amount', SortDirection.ASCENDING);
        break;
      case AccountSortValue.BALANCE_DESC:
        query.orderBy('amount', SortDirection.DESCENDING);
        break;
      default:
        query.orderBy('name', SortDirection.ASCENDING);
        break;
    }

    const accounts = await query.execute();

    return accounts.map((account) =>
      AccountEntity.initialize({
        id: account.id,
        userId: account.userId,
        name: account.name,
        amount: account.amount,
        currency: account.currency,
        records: null,
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
      records: null,
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
        records: null,
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
        records: null,
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
        records: null,
      }),
    );

    return void (await this.update(
      AccountEntity.initialize({
        ...receiverAccount,
        amount: +(receiverAccount.amount + amount).toFixed(2),
        records: null,
      }),
    ));
  }

  async findWithRecords(id: string): Promise<AccountEntity | null> {
    const account = await this.accountModel
      .query()
      .findById(id)
      .withGraphFetched(this.defaultRelationExpression)
      .modifyGraph(this.defaultRelationExpression, (builder) => {
        builder
          .withGraphFetched(this.recordDetailsRelationExpression)
          .withGraphFetched(this.categoryRelationExpression);
      });

    if (!account) return null;

    return AccountEntity.initialize({
      id: account.id,
      userId: account.userId,
      name: account.name,
      amount: account.amount,
      currency: account.currency,
      records: account.records.map((record) =>
        RecordEntity.initialize({
          id: record.id,
          type: record.type,
          amount: record.amount,
          remnant: record.remnant,
          accountId: record.accountId,
          toAccountId: record.toAccountId,
          subcategoryId: record.subcategoryId,
          date: record.date,
          payee: record.recordDetails?.payee,
          place: record.recordDetails.place,
          description: record.recordDetails.description,
          subcategory: record.subcategory
            ? SubcategoryEntity.initialize({
                id: record.subcategory.id,
                name: record.subcategory.name,
                categoryId: record.subcategory.categoryId,
                userId: record.subcategory.userId,
              })
            : null,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
        }),
      ),
    });
  }
}

export { AccountRepository };

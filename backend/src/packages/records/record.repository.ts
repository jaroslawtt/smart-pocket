import { IRepository } from '~/libs/interfaces/repository.interface.js';
import { RecordEntity } from '~/packages/records/record.entity.js';
import { RecordModel } from '~/packages/records/record.model.js';
import { SubcategoryEntity } from '~/packages/subcategories/subcategory.entity.js';

class RecordRepository implements Omit<IRepository, 'findAll'> {
  private readonly recordModel: typeof RecordModel;

  private readonly recordDetailsRelationExpression = 'recordDetails';
  private readonly categoryRelationExpression = 'subcategory';

  constructor(recordModel: typeof RecordModel) {
    this.recordModel = recordModel;
  }
  async create(payload: RecordEntity): Promise<RecordEntity> {
    const {
      type,
      amount,
      date,
      toAccountId,
      accountId,
      fromAccountId,
      subcategoryId,
      payee,
      description,
      place,
    } = payload.toNewObject();
    const record = await this.recordModel
      .query()
      .insertGraphAndFetch({
        type,
        amount,
        date,
        accountId,
        fromAccountId,
        toAccountId,
        subcategoryId,
        recordDetails: {
          payee,
          place,
          description,
        },
      })
      .withGraphFetched(this.recordDetailsRelationExpression)
      .withGraphFetched(this.categoryRelationExpression)
      .execute();

    return RecordEntity.initialize({
      id: record.id,
      type: record.type,
      amount: record.amount,
      accountId: record.accountId,
      fromAccountId: record.fromAccountId,
      toAccountId: record.toAccountId,
      subcategoryId: record.subcategoryId,
      date: record.date,
      payee: record.recordDetails.payee,
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
    });
  }

  async delete(id: string): Promise<void> {
    return void (await this.recordModel.query().deleteById(id));
  }

  async find(id: string): Promise<RecordEntity | null> {
    const record = await this.recordModel
      .query()
      .findById(id)
      .withGraphFetched(this.recordDetailsRelationExpression)
      .withGraphFetched(this.categoryRelationExpression)
      .execute();

    if (!record) return null;

    return RecordEntity.initialize({
      id: record.id,
      type: record.type,
      amount: record.amount,
      accountId: record.accountId,
      fromAccountId: record.fromAccountId,
      toAccountId: record.toAccountId,
      subcategoryId: record.subcategoryId,
      date: record.date,
      payee: record.recordDetails.payee,
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
    });
  }

  async findByUserId(userId: string): Promise<RecordEntity[]> {
    const records = await this.recordModel
      .query()
      .join('accounts', 'accounts.id', '=', 'records.account_id')
      .join('users', 'users.id', '=', 'accounts.user_id')
      .where('users.id', userId)
      .withGraphFetched(this.recordDetailsRelationExpression)
      .withGraphFetched(this.categoryRelationExpression)
      .execute();

    return records.map((record) =>
      RecordEntity.initialize({
        id: record.id,
        type: record.type,
        amount: record.amount,
        accountId: record.accountId,
        fromAccountId: record.fromAccountId,
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
      }),
    );
  }

  async update(payload: RecordEntity): Promise<RecordEntity> {
    const {
      id,
      type,
      accountId,
      fromAccountId,
      toAccountId,
      amount,
      date,
      payee,
      subcategoryId,
      description,
      place,
    } = payload.toObject();

    await this.recordModel
      .relatedQuery(this.recordDetailsRelationExpression)
      .for(id)
      .patch({
        payee,
        place,
        description,
      });

    const record = await this.recordModel
      .query()
      .patchAndFetchById(id, {
        type,
        accountId,
        fromAccountId,
        toAccountId,
        amount,
        date,
        subcategoryId,
      })
      .withGraphFetched(this.recordDetailsRelationExpression)
      .withGraphFetched(this.categoryRelationExpression)
      .execute();

    return RecordEntity.initialize({
      id: record.id,
      type: record.type,
      amount: record.amount,
      accountId: record.accountId,
      fromAccountId: record.fromAccountId,
      toAccountId: record.toAccountId,
      subcategoryId: record.subcategoryId,
      date: record.date,
      payee: record.recordDetails.payee,
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
    });
  }
}

export { RecordRepository };

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';
import { AccountCurrencyValue } from '~/packages/accounts/libs/enums/enums.js';
import { Model, RelationMappings } from 'objection';
import { UserModel } from '~/packages/users/user.model.js';
import { RecordModel } from '~/packages/records/record.model.js';

class AccountModel extends AbstractModel {
  public 'id': string;

  public 'userId': string;

  public 'name': string;

  public 'amount': number;

  public 'currency': ValueOf<typeof AccountCurrencyValue>;

  public 'records': RecordModel[];

  public static override get tableName(): string {
    return DatabaseTableName.ACCOUNTS;
  }

  public static override get relationMappings(): RelationMappings {
    return {
      records: {
        relation: Model.HasManyRelation,
        modelClass: RecordModel,
        join: {
          from: getJoinRelationPath<AccountModel>(
            DatabaseTableName.ACCOUNTS,
            'id',
          ),
          to: getJoinRelationPath<RecordModel>(
            DatabaseTableName.RECORDS,
            'accountId',
          ),
        },
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: getJoinRelationPath<AccountModel>(
            DatabaseTableName.ACCOUNTS,
            'userId',
          ),
          to: getJoinRelationPath<UserModel>(DatabaseTableName.USERS, 'id'),
        },
      },
    };
  }
}

export { AccountModel };

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';
import { AccountCurrencyValue } from '~/packages/accounts/libs/enums/enums.js';
import { Model, RelationMappings } from 'objection';
import { UserModel } from '~/packages/users/user.model.js';

class AccountModel extends AbstractModel {
  public 'userId': string;

  public 'name': string;

  public 'amount': number;

  public 'currency': ValueOf<typeof AccountCurrencyValue>;

  public static override get tableName(): string {
    return DatabaseTableName.ACCOUNTS;
  }

  public static override get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: getJoinRelationPath<AccountModel>(
            DatabaseTableName.ACCOUNTS,
            'userId',
          ),
          to: getJoinRelationPath(DatabaseTableName.USERS, 'id'),
        },
      },
    };
  }
}

export { AccountModel };

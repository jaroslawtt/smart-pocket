import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { Model, RelationMappings } from 'objection';
import { UserModel } from '~/packages/users/user.model.js';

class UserDetailsModel extends AbstractModel {
  public 'userId': string;

  public 'firstName': string;

  public 'lastName': string;

  public 'username': string;

  public static override get tableName(): string {
    return DatabaseTableName.USER_DETAILS;
  }

  public static override get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: getJoinRelationPath<UserDetailsModel>(
            DatabaseTableName.USER_DETAILS,
            'userId',
          ),
          to: getJoinRelationPath(DatabaseTableName.USERS, 'id'),
        },
      },
    };
  }
}

export { UserDetailsModel };

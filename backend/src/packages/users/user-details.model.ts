import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { Model, RelationMappings } from 'objection';
import { UserModel } from '~/packages/users/user.model.js';
import { FileModel } from "~/libs/packages/file/file.model.js";

class UserDetailsModel extends AbstractModel {
  public 'id': string;

  public 'userId': string;

  public 'firstName': string;

  public 'lastName': string;

  public 'username': string;

  public 'avatarId': number | null;

  public 'avatar': FileModel | null;

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
          to: getJoinRelationPath<UserModel>(DatabaseTableName.USERS, 'id'),
        },
      },
      avatar: {
        relation: Model.HasOneRelation,
        modelClass: FileModel,
        join: {
          from: getJoinRelationPath<UserDetailsModel>(
              DatabaseTableName.USER_DETAILS,
              'avatarId',
          ),
          to: getJoinRelationPath<FileModel>(DatabaseTableName.FILES, 'id'),
        },
      },
    };
  }
}

export { UserDetailsModel };

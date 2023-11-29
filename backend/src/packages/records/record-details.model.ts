import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { Model, RelationMappings } from 'objection';
import { RecordModel } from '~/packages/records/record.model.js';

class RecordDetailsModel extends AbstractModel {
  public 'id': string;

  public 'recordId': string;

  public 'payee': string | null;

  public 'description': string | null;

  public 'place': string | null;

  public static override get tableName(): string {
    return DatabaseTableName.RECORD_DETAILS;
  }

  public static override get relationMappings(): RelationMappings {
    return {
      record: {
        relation: Model.HasOneRelation,
        modelClass: RecordModel,
        join: {
          from: getJoinRelationPath<RecordDetailsModel>(
            DatabaseTableName.RECORD_DETAILS,
            'recordId',
          ),
          to: getJoinRelationPath<RecordModel>(DatabaseTableName.RECORDS, 'id'),
        },
      },
    };
  }
}

export { RecordDetailsModel };

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';
import { RecordTypeValue } from '~/packages/records/records.js';
import { Model, RelationMappings } from 'objection';
import { RecordDetailsModel } from '~/packages/records/record-details.model.js';
import { SubcategoryModel } from '~/packages/subcategories/subcategory.model.js';

class RecordModel extends AbstractModel {
  public 'id': string;

  public 'type': ValueOf<typeof RecordTypeValue>;

  public 'accountId': string;

  public 'toAccountId': string | null;

  public 'amount': number;

  public 'remnant': number;

  public 'date': string;

  public 'subcategoryId': number | null;

  public 'recordDetails': RecordDetailsModel;

  public 'subcategory': SubcategoryModel | null;

  public static override get tableName(): string {
    return DatabaseTableName.RECORDS;
  }

  public static override relationMappings = (): RelationMappings => ({
    subcategory: {
      relation: Model.BelongsToOneRelation,
      modelClass: SubcategoryModel,
      join: {
        from: getJoinRelationPath<RecordModel>(
          DatabaseTableName.RECORDS,
          'subcategoryId',
        ),
        to: getJoinRelationPath<SubcategoryModel>(
          DatabaseTableName.RECORD_SUBCATEGORIES,
          'id',
        ),
      },
    },
    recordDetails: {
      relation: Model.HasOneRelation,
      modelClass: RecordDetailsModel,
      join: {
        from: getJoinRelationPath<RecordModel>(DatabaseTableName.RECORDS, 'id'),
        to: getJoinRelationPath<RecordDetailsModel>(
          DatabaseTableName.RECORD_DETAILS,
          'recordId',
        ),
      },
    },
  });
}

export { RecordModel };

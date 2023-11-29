import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { RelationMappings } from 'objection';

class SubcategoryModel extends AbstractModel {
  public 'id': number;

  public 'name': string;

  public 'categoryId': number;

  public 'userId': string | null;

  public static override get tableName(): string {
    return DatabaseTableName.RECORD_SUBCATEGORIES;
  }

  public static override relationMappings = (): RelationMappings => {
    return {};
  };
}

export { SubcategoryModel };

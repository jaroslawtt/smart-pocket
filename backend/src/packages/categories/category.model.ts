import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { Model, RelationMappings } from 'objection';
import { SubcategoryModel } from '~/packages/subcategories/subcategory.model.js';

class CategoryModel extends AbstractModel {
  public 'id': number;

  public 'name': string;

  public 'subcategories': Array<SubcategoryModel>;

  public static override get tableName(): string {
    return DatabaseTableName.RECORD_CATEGORIES;
  }

  public static override relationMappings = (): RelationMappings => {
    return {
      subcategories: {
        relation: Model.HasManyRelation,
        modelClass: SubcategoryModel,
        join: {
          from: getJoinRelationPath<SubcategoryModel>(
            DatabaseTableName.RECORD_SUBCATEGORIES,
            'categoryId',
          ),
          to: getJoinRelationPath<CategoryModel>(
            DatabaseTableName.RECORD_CATEGORIES,
            'id',
          ),
        },
      },
    };
  };
}

export { CategoryModel };

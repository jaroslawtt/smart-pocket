import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class FileModel extends AbstractModel {
  public 'id': number;

  public 'url': string;

  public static override get tableName(): string {
    return DatabaseTableName.FILES;
  }
}

export { FileModel };

import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { CategoryValue } from '~/packages/categories/categories.js';

export async function seed(knex: Knex): Promise<void> {
  await knex(DatabaseTableName.RECORD_CATEGORIES).del();

  await knex(DatabaseTableName.RECORD_CATEGORIES).insert(
    Object.values(CategoryValue).map((category, index) => ({
      id: ++index,
      name: category,
    })),
  );
}

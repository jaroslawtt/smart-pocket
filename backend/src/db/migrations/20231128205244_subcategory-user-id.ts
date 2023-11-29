import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/database.js';

const ColumnName = {
  USER_ID: 'user_id',
};

export async function up(knex: Knex) {
  return knex.schema.table(DatabaseTableName.RECORD_SUBCATEGORIES, (table) => {
    table
      .uuid(ColumnName.USER_ID)
      .unsigned()
      .references('id')
      .inTable(DatabaseTableName.USERS)
      .onDelete('CASCADE')
      .nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.table(DatabaseTableName.RECORD_SUBCATEGORIES, (table) => {
    table.dropColumn(ColumnName.USER_ID);
  });
}

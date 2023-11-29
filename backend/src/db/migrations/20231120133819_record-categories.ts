import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/database.package.js';

const ColumnName = {
  ID: 'id',
  NAME: 'name',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    DatabaseTableName.RECORD_CATEGORIES,
    (table) => {
      table.increments(ColumnName.ID).primary();
      table.string(ColumnName.NAME, 55).notNullable();
      table
        .dateTime(ColumnName.CREATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
      table
        .dateTime(ColumnName.UPDATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DatabaseTableName.RECORD_CATEGORIES);
}

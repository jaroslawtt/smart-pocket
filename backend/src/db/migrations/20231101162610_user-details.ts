import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/database.package.js';

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  USERNAME: 'username',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};
export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    'create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";',
  );

  return knex.schema.createTable(DatabaseTableName.USER_DETAILS, (table) => {
    table
      .uuid(ColumnName.ID)
      .unique()
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid(ColumnName.USER_ID)
      .unsigned()
      .references('id')
      .inTable(DatabaseTableName.USERS)
      .onDelete('CASCADE');
    table.string(ColumnName.FIRST_NAME).notNullable();
    table.string(ColumnName.LAST_NAME).notNullable();
    table.string(ColumnName.USERNAME).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DatabaseTableName.USER_DETAILS);
}

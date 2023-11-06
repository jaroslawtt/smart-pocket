import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/database.package.js';

const ColumnName = {
  ID: 'id',
  EMAIL: 'email',
  PASSWORD_HASH: 'password_hash',
  PASSWORD_SALT: 'password_salt',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};
export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    'create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";',
  );

  return knex.schema.createTable(DatabaseTableName.USERS, (table) => {
    table
      .uuid(ColumnName.ID)
      .unique()
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string(ColumnName.EMAIL).unique().notNullable();
    table.text(ColumnName.PASSWORD_HASH).notNullable();
    table.text(ColumnName.PASSWORD_SALT).notNullable();
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
  return knex.schema.dropTableIfExists(DatabaseTableName.USERS);
}

import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/libs/enums/database-table-name.enum.js';
import { AccountCurrencyValue } from '~/packages/accounts/libs/enums/enums.js';

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  NAME: 'name',
  AMOUNT: 'amount',
  CURRENCY: 'currency',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};
export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    'create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";',
  );

  return knex.schema.createTable(DatabaseTableName.ACCOUNTS, (table) => {
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
      .inTable(DatabaseTableName.USERS);
    table.string(ColumnName.NAME).notNullable();
    table.double(ColumnName.AMOUNT).notNullable().defaultTo(0);
    table
      .enum(ColumnName.CURRENCY, [...Object.values(AccountCurrencyValue)])
      .notNullable();
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
  return knex.schema.dropTableIfExists(DatabaseTableName.ACCOUNTS);
}

import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { RecordTypeValue } from '~/packages/records/records.js';

const ColumnName = {
  ID: 'id',
  TYPE: 'type',
  ACCOUNT_ID: 'account_id',
  FROM_ACCOUNT_ID: 'from_account_id',
  TO_ACCOUNT_ID: 'to_account_id',
  AMOUNT: 'amount',
  SUBCATEGORY_ID: 'subcategory_id',
  DATE: 'date',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    'create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";',
  );

  return knex.schema.createTable(DatabaseTableName.RECORDS, (table) => {
    table
      .uuid(ColumnName.ID)
      .unique()
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .enum(ColumnName.TYPE, [...Object.values(RecordTypeValue)])
      .notNullable();
    table
      .uuid(ColumnName.ACCOUNT_ID)
      .unsigned()
      .references('id')
      .inTable(DatabaseTableName.ACCOUNTS)
      .nullable();
    table
      .uuid(ColumnName.FROM_ACCOUNT_ID)
      .unsigned()
      .references('id')
      .inTable(DatabaseTableName.ACCOUNTS)
      .nullable();
    table
      .uuid(ColumnName.TO_ACCOUNT_ID)
      .unsigned()
      .references('id')
      .inTable(DatabaseTableName.ACCOUNTS)
      .nullable();
    table.double(ColumnName.AMOUNT).notNullable().defaultTo(0);
    table
      .integer(ColumnName.SUBCATEGORY_ID)
      .unsigned()
      .references('id')
      .inTable(DatabaseTableName.RECORD_SUBCATEGORIES)
      .nullable();
    table.dateTime(ColumnName.DATE).notNullable().defaultTo(knex.fn.now());
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
  return knex.schema.dropTableIfExists(DatabaseTableName.RECORDS);
}

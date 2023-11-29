import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/database.js';

const ColumnName = {
  ID: 'id',
  RECORD_ID: 'record_id',
  PAYEE: 'payee',
  DESCRIPTION: 'description',
  PLACE: 'place',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    'create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";',
  );

  return knex.schema.createTable(DatabaseTableName.RECORD_DETAILS, (table) => {
    table
      .uuid(ColumnName.ID)
      .unique()
      .notNullable()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid(ColumnName.RECORD_ID)
      .unsigned()
      .references('id')
      .inTable(DatabaseTableName.RECORDS)
      .onDelete('CASCADE');
    table.string(ColumnName.PAYEE, 255).nullable();
    table.string(ColumnName.DESCRIPTION).nullable();
    table.string(ColumnName.PLACE, 255).nullable();
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
  return knex.schema.dropTableIfExists(DatabaseTableName.RECORD_DETAILS);
}

import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/database.js';

const ColumnName = {
  DATE: 'date',
};

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(DatabaseTableName.RECORDS, (table) => {
    table.string(ColumnName.DATE).defaultTo(knex.fn.now()).alter();
  });
}

export async function down(knex: Knex): Promise<void> {}

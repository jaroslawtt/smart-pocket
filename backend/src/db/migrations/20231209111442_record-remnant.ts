import { Knex } from 'knex';
import { DatabaseTableName } from '~/libs/packages/database/libs/enums/database-table-name.enum.js';

const ColumnName = {
  REMNANT: 'remnant',
};
export async function up(knex: Knex): Promise<void> {
  return knex.schema.table(DatabaseTableName.RECORDS, (table) => {
    table.double(ColumnName.REMNANT).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table(DatabaseTableName.RECORDS, (table) => {
    table.dropColumn(ColumnName.REMNANT);
  });
}

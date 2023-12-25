import { type Knex } from 'knex';
import { DatabaseTableName } from "~/libs/packages/database/database.js";

const ColumnName = {
    ID: 'id',
    AVATAR_ID: 'avatar_id',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(DatabaseTableName.USER_DETAILS, (table) => {
        table
            .integer(ColumnName.AVATAR_ID)
            .unsigned()
            .references(ColumnName.ID)
            .inTable(DatabaseTableName.FILES);
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(DatabaseTableName.USER_DETAILS, (table) => {
        table.dropForeign(ColumnName.AVATAR_ID);
        table.dropColumn(ColumnName.AVATAR_ID);
    });
}

export { down, up };

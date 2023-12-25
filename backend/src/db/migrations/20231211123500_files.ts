import { type Knex } from 'knex';
import { DatabaseTableName } from "~/libs/packages/database/database.js";

const ColumnName = {
    ID: 'id',
    URL: 'url',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DatabaseTableName.FILES, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.URL).notNullable();
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

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DatabaseTableName.FILES);
}

export { down, up };

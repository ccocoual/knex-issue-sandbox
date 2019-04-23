
exports.up = knex => knex.schema.hasTable('Table1').then((table1Exists) => {
  if (table1Exists) {
    return knex.schema.alterTable('Table1', (table) => {
      table.boolean('column1').notNullable().default(false).alter();
    });
  }
  return null;
});

exports.down = knex => knex.schema.hasTable('Table1').then((table1Exists) => {
  if (table1Exists) {
    return knex.schema.alterTable('Table1', (table) => {
      table.boolean('column1').nullable().default(null).alter();
    });
  }
  return null;
});

exports.config = { transaction: false };
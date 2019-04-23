
exports.up = knex => knex.schema.hasTable('Table1').then((table1Exists) => {
  if (!table1Exists) {
    return knex.schema.createTable('Table1', (table) => {
      table.boolean('column1');
    });
  }
  return null;
});

exports.down = knex => knex.schema.dropTable('Table1');

exports.config = { transaction: false };
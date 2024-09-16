const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.place, (table) => {
      table.increments('id'); // 👈 1

      table.string('name', 255).notNullable(); // 👈 2

      table.unique('name', 'idx_place_name_unique'); // 👈 3
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists('places');
  },
};

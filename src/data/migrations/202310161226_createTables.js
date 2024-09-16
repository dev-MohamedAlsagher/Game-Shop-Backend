const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.date('date_of_birth').notNullable();
      table.string('username', 255).notNullable();
      table.string('password_hash', 255).notNullable();
      table.string('email', 255).notNullable();
      table.unique('email', 'idx_user_email_unique');
      table.jsonb('roles').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable(tables.bestellingen, (table) => {
      table.increments('id').primary();
      table.integer('userID').unsigned().notNullable();
      table.foreign('userID').references('id').inTable(tables.user);
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable(tables.games, (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('beschrijving', 1000).notNullable();
      table.string('image_url', 255);
      table.float('prijs').notNullable();
      table.string('console', 255).notNullable();
    });

    await knex.schema.createTable(tables.transacties, (table) => {
      table.increments("id").primary();
      table.integer("bestellingID").unsigned().notNullable();
      table.foreign("bestellingID").references("id").inTable("bestellingen");
      table.timestamp("transactieDatum").defaultTo(knex.fn.now());
      table.string("betaalmethode", 255).notNullable();
      table.float("totaalbedrag").notNullable();
    });

    await knex.schema.createTable(tables.bestelde_games, (table) => {
      table.increments('id').primary();
      table.integer('bestellingID').unsigned().notNullable();
      table.foreign('bestellingID').references('id').inTable(tables.bestellingen);
      table.integer('gameID').unsigned().notNullable();
      table.integer('quantity').notNullable();
      table.float('price').notNullable();
    });
  },
  down: (knex) => {
    return Promise.all([
      knex.schema.dropTableIfExists(tables.bestelde_games),
      knex.schema.dropTableIfExists(tables.bestellingen),
      knex.schema.dropTableIfExists(tables.games),
      knex.schema.dropTableIfExists(tables.transacties),
      knex.schema.dropTableIfExists(tables.user),
    ]);
  },
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();

    table
      .string('username', 128)
      .notNullable()
      .unique();
    table.string('passHash', 128).notNullable();
    table.string('departments').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};

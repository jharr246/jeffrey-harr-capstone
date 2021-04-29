exports.up = function (knex) {
  return knex.schema.createTable("profiles_meets", function (table) {
    table.increments("id").primary();
    table
      .integer("profile_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("profiles");
    table
      .integer("meet_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("meets");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("profiles_meets");
};

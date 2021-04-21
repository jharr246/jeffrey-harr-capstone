exports.up = function (knex) {
  return knex.schema.createTable("meets", (table) => {
    table.increments("id").primary();
    table.string("date").notNullable();
    table.string("time").notNullable();
    table.string("Location").notNullable();
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("meets");
};

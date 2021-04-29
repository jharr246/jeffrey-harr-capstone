exports.up = function (knex) {
  return knex.schema.createTable("meets", (table) => {
    table.increments("id").primary();
    table.string("date").notNullable();
    table.string("time").notNullable();
    table.string("parkName").notNullable();
    table.string("parkAddress").notNullable();
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("meets");
};

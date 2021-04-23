exports.up = function (knex) {
  return knex.schema.table("profiles", (table) => {
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.table("profiles", (table) => {
    table.dropColumn("user_id");
  });
};

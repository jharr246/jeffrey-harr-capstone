exports.up = function (knex) {
  return knex.schema.createTable("profiles", (table) => {
    table.increments("id").primary();
    table.string("dogName").notNullable();
    table.string("dogBio").notNullable();
    table.string("dogAvatar").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("breed").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("profiles");
};

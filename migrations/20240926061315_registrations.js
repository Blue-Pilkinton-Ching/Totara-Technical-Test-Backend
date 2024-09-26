/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('registrations', (table) => {
    table.string('uid', 256).primary()
    table.string('first_name', 64).notNullable()
    table.string('last_name', 64).notNullable()
    table.string('food', 128).notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('registrations')
}

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'officers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('discord_id').notNullable().primary()
      table.string('username').notNullable()
      table.string('display_name').notNullable()
      table.string('full_name').notNullable()
      table.string('serial').notNullable()
      table.json('roles')

      table.string('comment').nullable()
      table.string('decision').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

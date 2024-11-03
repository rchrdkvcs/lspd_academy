import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Pto extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare toDiscordId: string

  @column()
  declare rk1: string

  @column()
  declare rk2: string

  @column()
  declare rk3: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

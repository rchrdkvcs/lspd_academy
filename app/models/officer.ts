import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Officer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare discordId: string

  @column()
  declare username: string

  @column()
  declare displayName: string

  @column()
  declare fullName: string

  @column()
  declare serial: string

  @column()
  declare roles: { id: string; name: string }[]

  @column()
  declare fInitiale: boolean

  @column()
  declare fPpa: boolean

  @column()
  declare fPpal: boolean

  @column()
  declare fNego: boolean

  @column()
  declare fLinc: boolean

  @column()
  declare comments: string

  @column()
  declare decision: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

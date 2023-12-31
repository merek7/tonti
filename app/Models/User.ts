import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string

  @column()
  public prenom: string

  @column()
  public telephone: string

  @column()
  public roles: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @beforeSave()
  public static async validatePhoneNumber (user: User) {
    const regex = /^(\d{8})$/
    if (user.$dirty.telephone) {
      if (!regex.test(user.telephone)) {
        throw new Error('Le numéro de téléphone doit être composé de 8 chiffres')
      }
    }
  }
  @hasOne(() => Role)
  public role: HasOne<typeof Role>
}

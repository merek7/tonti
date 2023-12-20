import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RoleFactory } from 'Database/factories/RoleFactory'

export default class extends BaseSeeder {
  public async run () {
    const adminRole = await RoleFactory.apply('admin').create()
    const participantRole = await RoleFactory.apply('participant').create()
  }
}

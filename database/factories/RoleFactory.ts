import Role from 'App/Models/Role'
import Factory from '@ioc:Adonis/Lucid/Factory'
export const RoleFactory = Factory
  .define(Role, ({ faker }) => {
    return {

    }
  })
  .state('admin', (role) => {
    role.nom = 'admin'
  })
  .state('participant', (role) => {
    role.nom = 'participant'
  })
  .build()

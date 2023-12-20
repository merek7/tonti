import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
  public async getRoles ({ request }: HttpContextContract) {
    const roles = await Role.all()
    return {
      status: request.input('status'),
      data: roles,
    }
  }
}


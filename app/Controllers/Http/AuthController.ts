/* eslint-disable @typescript-eslint/quotes */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
export default class AuthController {
  public async register ({ request, auth, response }: HttpContextContract) {
    try {
      const userData = request.only(['telephone', 'password', 'nom', 'prenom', 'role_id'])
      const role = await Role.findOrFail(userData.role_id)
      const user = await User.firstOrNew(
        { telephone: userData.telephone })
      if (!user.$isNew) {
        return response.badRequest('cet utilisateur existe déjà')
      }
      user.merge({
        telephone: userData.telephone,
        password: userData.password,
        nom: userData.nom,
        prenom: userData.prenom,
        roles: role.id.toString(),
      })
      await user.save()
      const token = await auth.use('api').attempt(userData.telephone, userData.password)
      return {
        status: response.created,
        user,
        token,
      }
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message })
    }
  }

  public async login ({ request, auth, response }: HttpContextContract) {
    try {
      const { telephone, password } = request.only(['telephone', 'password'])
      const token = await auth.use('api').attempt(telephone, password)
      return {
        status: response.ok,
        token,
      }
    } catch (error) {
      return response.unauthorized({ message: 'Erreur lors de la connexion', error: error.message })
    }
  }
}


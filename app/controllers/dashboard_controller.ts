import Officer from '#models/officer'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async render({ inertia, auth }: HttpContext) {
    const authUser = await auth.getUserOrFail()
    const user = await Officer.query().where('discordId', authUser.discordId)

    console.log(user)

    return inertia.render('supervisor/dashboard')
  }
}

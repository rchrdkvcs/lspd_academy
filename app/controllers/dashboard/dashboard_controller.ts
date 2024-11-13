import Officer from '#models/officer'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async render({ inertia, auth }: HttpContext) {
    const authUser = await auth.getUserOrFail()
    const { fullName } = await Officer.findByOrFail('discordId', authUser.discordId)

    return inertia.render('dashboard/show', { fullName })
  }
}

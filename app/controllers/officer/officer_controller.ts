import Officer from '#models/officer'
import type { HttpContext } from '@adonisjs/core/http'

export default class OfficerController {
  async render({ inertia }: HttpContext) {
    const officers = await Officer.all()

    return inertia.render('officer/show', { officers })
  }
}

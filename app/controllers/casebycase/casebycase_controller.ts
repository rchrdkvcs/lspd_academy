import Officer from '#models/officer'
import type { HttpContext } from '@adonisjs/core/http'

export default class CaseByCaseController {
  async render({ inertia }: HttpContext) {
    const officers = await Officer.all()

    return inertia.render('casebycase/show', { officers })
  }
}

import type { HttpContext } from '@adonisjs/core/http'

export default class DivisionController {
  async render({ inertia }: HttpContext) {
    return inertia.render('supervisor/division')
  }
}

import Officer from '#models/officer'
import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'

export default class CasparcasController {
  async render({ inertia }: HttpContext) {
    const officers = await Officer.all()

    transmit.broadcast('test/1', { message: 'Hello!' })

    // TODO: Create logic of change post to db when CPC is changed

    return inertia.render('supervisor/casparcas', { officers })
  }
}

import Officer from '#models/officer'
import Pto from '#models/pto'
import type { HttpContext } from '@adonisjs/core/http'

export default class DivisionController {
  async render({ inertia }: HttpContext) {
    const officers = await Officer.all()
    const ptos = await Pto.all()

    // Get all instructors
    const instructeurs = officers.filter(
      (officer) =>
        !officer.roles.some(
          (role) =>
            role.id === '965280713916166211' ||
            role.id === '1291497374535123016' ||
            role.id === '965280713916166212'
        )
    )

    // Get all rookies
    const allRookies = officers.filter((officer) =>
      officer.roles.some((role) => role.id === '965280713916166211')
    )

    // Create a map of assigned rookies
    const assignedRookies = new Map()
    ptos.forEach((pto) => {
      if (pto.rk1) assignedRookies.set(pto.rk1, { instructor: pto.toDiscordId, position: 'rk1' })
      if (pto.rk2) assignedRookies.set(pto.rk2, { instructor: pto.toDiscordId, position: 'rk2' })
      if (pto.rk3) assignedRookies.set(pto.rk3, { instructor: pto.toDiscordId, position: 'rk3' })
    })

    // Filter available rookies (those not assigned to any instructor)
    const availableRookies = allRookies.filter((rookie) => !assignedRookies.has(rookie.discordId))

    // Get existing assignments
    const assignments = ptos.reduce(
      (acc, pto) => {
        acc[pto.toDiscordId] = {
          rk1: pto.rk1 || null,
          rk2: pto.rk2 || null,
          rk3: pto.rk3 || null,
        }
        return acc
      },
      {} as Record<string, { rk1: string | null; rk2: string | null; rk3: string | null }>
    )

    return inertia.render('supervisor/division', {
      instructeurs,
      rookies: availableRookies,
      allRookies,
      assignments,
    })
  }

  async store({ request, response }: HttpContext) {
    const { assignments } = request.all()

    try {
      // Traiter chaque assignment
      for (const instructeurId in assignments) {
        const data = assignments[instructeurId]
        await Pto.updateOrCreate(
          { toDiscordId: data.toDiscordId },
          {
            toDiscordId: data.toDiscordId,
            rk1: data.rk1 || null,
            rk2: data.rk2 || null,
            rk3: data.rk3 || null,
          }
        )
      }

      return response.redirect().toPath('/division')
    } catch (error) {
      return response.status(400).json({
        success: false,
        error: error.message,
      })
    }
  }
}

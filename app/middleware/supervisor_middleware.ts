import Officer from '#models/officer'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SupervisorMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (!ctx.auth.user) {
      return ctx.response.redirect('/login')
    }

    const discordId = await ctx.auth.user?.discordId

    function hasRole(roles: any[], roleId: string) {
      return roles.some((role) => role.id === roleId)
    }

    const user = await Officer.query().where('discord_id', discordId).firstOrFail()

    if (
      hasRole(user.roles, '1239562626246377513') ||
      hasRole(user.roles, '1028016217899925515') ||
      hasRole(user.roles, '1291497374535123016')
    ) {
      return await next()
    } else {
      return ctx.response.redirect('/access-denied')
    }
  }
}

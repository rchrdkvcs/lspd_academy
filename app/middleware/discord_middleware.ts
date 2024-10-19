import Officer from '#models/officer'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import DiscordClientProvider from '../providers/discord_client_provider.js'

export default class DiscordMiddleware {
  async handle({ inertia }: HttpContext, next: NextFn) {
    const client = await DiscordClientProvider.Client()

    const guild = await client.guilds.fetch(env.get('DISCORD_LSPD'))
    const members = await guild.members.fetch()

    const guildMembers = members.map((member) => ({
      id: member.user.id,
      username: member.user.username,
      displayName: member.displayName,
      fullName: member.displayName.split(' | ')[1],
      serial: member.displayName.split(' | ')[0],
      roles: member.roles.cache.map((role) => ({
        id: role.id,
        name: role.name,
      })),
    }))

    const officers = guildMembers.filter((member) =>
      member.roles.some((role) => role.id === '965280713916166210')
    )

    for (const officer of officers) {
      await Officer.updateOrCreate(
        { discordId: officer.id },
        {
          discordId: officer.id,
          displayName: officer.displayName,
          fullName: officer.fullName || officer.displayName,
          roles: JSON.stringify(officer.roles),
          serial: officer.serial,
          username: officer.username,
        }
      )
    }

    const dbOfficers = await Officer.all()

    for (const dbOfficer of dbOfficers) {
      if (!officers.some((officer) => officer.id === dbOfficer.discordId)) {
        await Officer.query().where('discordId', dbOfficer.discordId).delete()
      }
    }

    // inertia.share({ officers: dbOfficers })

    await next()
  }
}

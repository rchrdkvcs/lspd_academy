import Officer from '#models/officer'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import DiscordClientProvider from '../providers/discord_client_provider.js'

interface OfficerData {
  id: string
  username: string
  displayName: string
  fullName?: string
  serial?: string
  roles: Array<{ id: string; name: string }>
}

export default class DiscordMiddleware {
  private async getDiscordMembers(): Promise<OfficerData[]> {
    const client = await DiscordClientProvider.Client()
    const guild = await client.guilds.fetch(env.get('DISCORD_LSPD'))
    const members = await guild.members.fetch()

    return members.map((member) => ({
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
  }

  private generateHash(officer: OfficerData | any): string {
    // Crée une empreinte unique des données de l'officier
    return JSON.stringify({
      username: officer.username,
      displayName: officer.displayName,
      fullName: officer.fullName,
      serial: officer.serial,
      roles: officer.roles,
    })
  }

  private async processUpdates(discordOfficers: OfficerData[], dbOfficers: any[]) {
    const updates: any[] = []
    const deletions: string[] = []
    const processed = new Set<string>()

    // Traiter les mises à jour et créations
    for (const officer of discordOfficers) {
      const dbOfficer = dbOfficers.find((db) => db.discordId === officer.id)
      processed.add(officer.id)

      const discordHash = this.generateHash(officer)
      const dbHash = dbOfficer ? this.generateHash(dbOfficer) : null

      if (!dbOfficer || discordHash !== dbHash) {
        updates.push({
          discordId: officer.id,
          displayName: officer.displayName,
          fullName: officer.fullName || officer.displayName,
          roles: JSON.stringify(officer.roles),
          serial: officer.serial,
          username: officer.username,
        })
      }
    }

    // Traiter les suppressions
    for (const dbOfficer of dbOfficers) {
      if (!processed.has(dbOfficer.discordId)) {
        deletions.push(dbOfficer.discordId)
      }
    }

    // Effectuer les mises à jour en batch si nécessaire
    if (updates.length > 0) {
      console.log(`Updating ${updates.length} officers`)
      await Promise.all(
        updates.map((update) => Officer.updateOrCreate({ discordId: update.discordId }, update))
      )
    }

    // Effectuer les suppressions en batch si nécessaire
    if (deletions.length > 0) {
      console.log(`Deleting ${deletions.length} officers`)
      await Officer.query().whereIn('discordId', deletions).delete()
    }

    return { updates: updates.length, deletions: deletions.length }
  }

  async handle({}: HttpContext, next: NextFn) {
    try {
      const startTime = Date.now()

      // Récupérer les membres Discord
      const guildMembers = await this.getDiscordMembers()

      // Filtrer pour n'avoir que les officiers
      const officers = guildMembers.filter((member) =>
        member.roles.some((role) => role.id === '965280713916166210')
      )

      // Récupérer les officiers de la base de données
      const dbOfficers = await Officer.all()

      // Traiter les mises à jour nécessaires
      const changes = await this.processUpdates(officers, dbOfficers)

      // Log uniquement si des changements ont été effectués
      if (changes.updates > 0 || changes.deletions > 0) {
        const duration = Date.now() - startTime
        console.log(`Sync completed in ${duration}ms:`, {
          updates: changes.updates,
          deletions: changes.deletions,
        })
      }
    } catch (error) {
      console.error('Error in Discord middleware:', error)
    }

    return next()
  }
}

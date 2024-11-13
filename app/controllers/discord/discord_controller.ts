import Pto from '#models/pto'
import { HttpContext } from '@adonisjs/core/http'
import { TextChannel } from 'discord.js'
import DiscordClientProvider from '../../providers/discord_client_provider.js'

interface PtoAssignment {
  toDiscordId: string
  rk1: string | null
  rk2: string | null
  rk3: string | null
}

class DiscordMessageService {
  private static readonly CHANNEL_IDS = {
    LSPD: '1302717045200392273',
    DIV: '1301705148665430059',
  }

  private static async clearChannel(channel: TextChannel | null): Promise<void> {
    if (!channel) throw new Error('Channel non trouvé')
    const messages = await channel.messages.fetch({ limit: 100 })
    await channel.bulkDelete(messages, true)
  }

  private static formatCurrentDate(): string {
    const now = new Date()
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
      .format(now)
      .replace(',', '')
      .replace(':', 'h')
  }

  private static formatPtoMessage(ptoData: PtoAssignment[]): string {
    const activePtos = ptoData.filter(
      (pto) => pto.rk1 !== null || pto.rk2 !== null || pto.rk3 !== null
    )

    if (activePtos.length === 0) {
      return 'Aucune assignation PTO active actuellement.'
    }

    const message = activePtos.map((pto) => {
      const rookies = [
        pto.rk1 && `Rookie 1: <@${pto.rk1}>`,
        pto.rk2 && `Rookie 2: <@${pto.rk2}>`,
        pto.rk3 && `Rookie 3: <@${pto.rk3}>`,
      ].filter(Boolean)

      return `**Officier Instructeur : **<@${pto.toDiscordId}>\n${rookies.join('\n')}\n`
    })

    const formattedDate = this.formatCurrentDate()
    return (
      '_**Assignations Officier Instructeur**_ \n \n' +
      message.join('\n') +
      `\n *Dernière mise à jour le ${formattedDate}*`
    )
  }

  public static async updateChannels(): Promise<void> {
    const client = await DiscordClientProvider.Client()
    const channels = await Promise.all([
      client.channels.fetch(this.CHANNEL_IDS.LSPD) as Promise<TextChannel>,
      client.channels.fetch(this.CHANNEL_IDS.DIV) as Promise<TextChannel>,
    ])

    // Clear both channels concurrently
    await Promise.all(channels.map((channel) => this.clearChannel(channel)))

    const ptoData = await Pto.all()
    const formattedMessage = this.formatPtoMessage(ptoData)

    // Send messages to both channels concurrently
    await Promise.all(channels.map((channel) => channel?.send(formattedMessage)))
  }
}

export default class DiscordController {
  async handle({ response }: HttpContext) {
    try {
      await DiscordMessageService.updateChannels()
      return response.redirect().toPath('/division')
    } catch (error) {
      console.error("Erreur lors de l'envoi du message Discord:", error)
      return response.status(500).redirect().toPath('/division')
    }
  }
}

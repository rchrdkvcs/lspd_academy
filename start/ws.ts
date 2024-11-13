import Officer from '#models/officer'
import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import { Server } from 'socket.io'

app.ready(() => {
  const io = new Server(server.getNodeServer())

  io.on('connection', (socket) => {
    socket.on(
      'comment:update',
      async ({ discordId, comment }: { discordId: string; comment: string }) => {
        const officer = await Officer.findBy('discord_id', discordId)

        if (officer) {
          officer.comment = comment
          await officer.save()
        }

        socket.broadcast.emit('comment:updated', { discordId, comment })
      }
    )

    socket.on(
      'decision:update',
      async ({ discordId, decision }: { discordId: string; decision: string }) => {
        const officer = await Officer.findBy('discord_id', discordId)

        if (officer) {
          officer.decision = decision
          await officer.save()
        }

        socket.broadcast.emit('decision:updated', { discordId, decision })
      }
    )

    socket.on(
      'decision:unset',
      async ({ discordId, decision }: { discordId: string; decision: string }) => {
        const officer = await Officer.findBy('discord_id', discordId)

        if (officer) {
          officer.decision = ''
          await officer.save()
        }

        socket.broadcast.emit('decision:unset', { discordId, decision })
      }
    )
  })
})

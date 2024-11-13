import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async login({ ally }: HttpContext) {
    return ally.use('discord').redirect()
  }

  async callback({ ally, auth, response }: HttpContext) {
    const discord = ally.use('discord')
    const discordUser = await discord.user()
    const discordUserExists = await User.findBy('discordId', discordUser.id)

    if (discordUserExists) {
      const user = await User.verifyCredentials(discordUser.email, discordUser.token.token)

      await auth.use('web').login(user)
    } else {
      const newUser = await User.create({
        username: discordUser.original.username,
        email: discordUser.email,
        avatarUrl: discordUser.avatarUrl,
        discordId: discordUser.id,
        token: discordUser.token.token,
      })

      await auth.use('web').login(newUser)
    }

    return response.redirect('/')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect('/')
  }
}

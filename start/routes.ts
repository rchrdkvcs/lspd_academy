/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const HomeController = () => import('#controllers/home_controller')
const AuthController = () => import('#controllers/auth_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/login', [AuthController, 'login'])
router.get('/discord/callback', [AuthController, 'callback'])
router.get('/logout', [AuthController, 'logout'])

router
  .group(() => {
    router.get('/', [HomeController, 'index'])
  })
  .use(middleware.auth())

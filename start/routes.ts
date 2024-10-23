/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const OfficersController = () => import('#controllers/officers_controller')
const DivisionController = () => import('#controllers/divison_controller')

router.get('/login', [AuthController, 'render'])
router.get('/discord/redirect', [AuthController, 'login'])
router.get('/discord/callback', [AuthController, 'callback'])
router.get('/logout', [AuthController, 'logout'])

router
  .group(() => {
    router.get('/', [DashboardController, 'render'])
    router.get('/officers', [OfficersController, 'render'])
    router.get('/division', [DivisionController, 'render'])
  })
  .use(middleware.auth())
  .use(middleware.supervisor())

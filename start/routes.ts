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

const AuthController = () => import('#controllers/auth/auth_controller')
const DashboardController = () => import('#controllers/dashboard/dashboard_controller')
const OfficerController = () => import('#controllers/officer/officer_controller')
const DiscordController = () => import('#controllers/discord/discord_controller')
const CaseByCaseController = () => import('#controllers/casebycase/casebycase_controller')
const InstructorController = () => import('#controllers/instructor/instructor_controller')

router.get('/login', [AuthController, 'render'])
router.get('/discord/redirect', [AuthController, 'login'])
router.get('/discord/callback', [AuthController, 'callback'])
router.get('/logout', [AuthController, 'logout'])

router
  .group(() => {
    // DASHBOARD
    router.get('/', [DashboardController, 'render'])

    // OFFICERS
    router.get('/officers', [OfficerController, 'render'])

    // TRAINING
    router.get('/instructor', [InstructorController, 'render'])
    router.post('/create-pto', [InstructorController, 'store'])

    // CASE BY CASE
    router.get('/casparcas', [CaseByCaseController, 'render'])

    // DISCORD
    router.post('/update-pto-message', [DiscordController, 'handle'])
  })
  .use(middleware.auth())
  .use(middleware.supervisor())

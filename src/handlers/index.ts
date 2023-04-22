import { Router } from 'express'
// import { checkAuth } from 'middlewares/auth'
import { useRoute } from 'helpers/errors'
import validate from 'middlewares/validator'
import { loginSchema } from 'handlers/auth/validator'
import { getConfig } from 'handlers/config/controller'
import { login, logout, revalidateToken } from 'handlers/auth/controller'

const router = Router()

router.get('/', (_, res) => res.sendStatus(200))
router.get('/favicon.ico', (_, res) => res.sendStatus(200))
router.get('/config', useRoute(getConfig))

router.post('/login', validate(loginSchema), useRoute(login))
router.post('/logout', useRoute(logout))
router.post('/revalidate', useRoute(revalidateToken))

export default router

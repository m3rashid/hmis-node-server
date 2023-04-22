import { Router } from 'express'
import { login } from 'controllers/auth'
import { useRoute } from 'helpers/errors'
import { loginSchema } from 'validators/auth'
import { getConfig } from 'controllers/config'
import validateSchema from 'middlewares/validator'

const router = Router()

router.get('/', (_, res) => res.sendStatus(200))
router.get('/favicon.ico', (_, res) => res.sendStatus(200))
router.get('/config', useRoute(getConfig))

router.get('/login', useRoute(validateSchema(loginSchema)), useRoute(login))

export default router

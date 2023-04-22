import { Router } from 'express'
import { login } from 'controllers/auth'
import validateSchema from 'middlewares/validator'
import { loginSchema } from 'validators/auth'
import { useRoute } from 'helpers/errors'

const router = Router()

router.get('/', (req, res) => res.sendStatus(200))
router.get('/favicon.ico', (req, res) => res.sendStatus(200))

router.get('/login', useRoute(validateSchema(loginSchema)), useRoute(login))

export default router

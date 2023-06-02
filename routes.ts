import { Router } from 'express'

import {
	getAllUsers,
	getAllUsersWithDeleted,
	login,
	logout,
	revalidateToken
} from 'controllers/auth'
import { appConfig } from 'data/config'
import { useRoute } from 'utils/errors'
import validate from 'validators'
import { loginSchema } from 'validators/auth'

const router: Router = Router()

router.get('/', (req, res) => res.send('Hello World!'))
router.get('/health', (req, res) => res.send('Hello World!'))
router.get('/config', (req, res) => res.json(appConfig))

router.post('/login', validate(loginSchema), useRoute(login))
router.post('/logout', useRoute(logout))
router.post('/revalidate', useRoute(revalidateToken))
router.get('/user/all', useRoute(getAllUsers))
router.get('/user/all-with-deleted', useRoute(getAllUsersWithDeleted))

export default router

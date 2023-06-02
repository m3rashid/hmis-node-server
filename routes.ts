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
router.get('/health', (req, res) => {
	const healthCheck = {
		uptime: process.uptime(),
		responseTime: process.hrtime(),
		message: 'OK',
		timestamp: Date.now()
	}
	try {
		return res.status(200).send(healthCheck)
	} catch (error: any) {
		healthCheck.message = error
		return res.status(503).send(healthCheck)
	}
})
router.get('/config', (req, res) => res.json(appConfig))

router.post('/login', validate(loginSchema), useRoute(login))
router.post('/logout', useRoute(logout))
router.post('/revalidate', useRoute(revalidateToken))
router.get('/user/all', useRoute(getAllUsers))
router.get('/user/all-with-deleted', useRoute(getAllUsersWithDeleted))

export default router

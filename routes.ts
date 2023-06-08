import { Router } from 'express'

import {
	currentUser,
	currentUserAllDetails,
	forgotPassword,
	getAllUsers,
	getAllUsersWithDeleted,
	login,
	logout,
	resetPassword,
	revalidateToken,
	signupPatientFinalize,
	signupPatientInit,
	signupPatientStepTwo,
	signupUser,
	updatePassword
} from 'controllers/auth'
import {
	getAllConsumables,
	getAllConsumablesDeleted,
	getAllNonConsumables,
	getAllNonConsumablesDeleted
} from 'controllers/inventory'
import { getNotifications } from 'controllers/notification'
import { createProfile, updateProfile } from 'controllers/profile'
import {
	createRole,
	deleteRole,
	editRole,
	getRoleDetails,
	getRoleWithDeleted,
	getRoles
} from 'controllers/role'
import { appConfig } from 'data/config'
import { checkAuth } from 'middlewares/auth'
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

router.post('/auth/login', validate(loginSchema), useRoute(login))
router.post('/auth/logout', useRoute(logout))
router.post('/auth/revalidate', useRoute(revalidateToken))
router.get('/auth/user/all', useRoute(getAllUsers))
router.get('/auth/user/all-with-deleted', useRoute(getAllUsersWithDeleted))
router.post('/auth/user/me', checkAuth, useRoute(currentUser))
router.post('/auth/user/me-details', checkAuth, useRoute(currentUserAllDetails))
router.post('/auth/user/forgot-password', useRoute(forgotPassword))
router.post('/auth/user/reset-password', useRoute(resetPassword))
router.post('/auth/patient/signup-init', useRoute(signupPatientInit))
router.post('/auth/patient/signup-two', useRoute(signupPatientStepTwo))
router.post('/auth/patient/signup-final', useRoute(signupPatientFinalize))
router.post('/auth/user/signup', useRoute(signupUser))
router.post('/auth/user/update-password', useRoute(updatePassword))

router.post('/role/create', checkAuth, useRoute(createRole))
router.post('/role/delete', checkAuth, useRoute(deleteRole))
router.post('/role/edit', checkAuth, useRoute(editRole))
router.get('/role/all', checkAuth, useRoute(getRoles))
router.post('/role/details', checkAuth, useRoute(getRoleDetails))
router.get('/roles/all-with-deleted', checkAuth, useRoute(getRoleWithDeleted))

router.post('/profile/create', checkAuth, useRoute(createProfile))
router.post('/profile/update', checkAuth, useRoute(updateProfile))

router.get('/notification/all', checkAuth, useRoute(getNotifications))

router.get('/inventory/consumable/all', checkAuth, useRoute(getAllConsumables))
router.get('/inventory/consumable/removed', checkAuth, useRoute(getAllConsumablesDeleted))
router.get('/inventory/non-consumable/all', checkAuth, useRoute(getAllNonConsumables))
router.get('/inventory/non-consumable/removed', checkAuth, useRoute(getAllNonConsumablesDeleted))

export default router

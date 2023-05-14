import { Router } from 'express'
// import { checkAuth } from 'middlewares/auth'
import { useRoute } from 'helpers/errors'
import validate from 'middlewares/validator'
import { getConfig } from 'handlers/static/config'
import { loginSchema } from 'handlers/auth/validator'
import * as roleController from 'handlers/role/controller'
import * as userController from 'handlers/user/controller'
import * as resourceController from 'handlers/static/resourceTypes'
import * as inventoryController from 'handlers/inventory/controller'
import { login, logout, revalidateToken } from 'handlers/auth/controller'

const router = Router()

router.get('/', (_, res) => res.sendStatus(200))
router.get('/favicon.ico', (_, res) => res.sendStatus(200))
router.get('/config', useRoute(getConfig))

router.post('/login', validate(loginSchema), useRoute(login))
router.post('/logout', useRoute(logout))
router.post('/revalidate', useRoute(revalidateToken))

router.get('/resource-types/all', useRoute(resourceController.getAllResourceTypes))

router.get('/role/all', useRoute(roleController.getDetailRoles))
router.get('/role/allWithDeleted', useRoute(roleController.getRoleWithDeleted))
router.post('/role/create', useRoute(roleController.createRole))
router.post('/role/edit', useRoute(roleController.editRole))
router.post('/role/delete', useRoute(roleController.deleteRole))
router.post('/role/details', useRoute(roleController.getRoleDetails))

router.post('/profile/create', useRoute(userController.createProfile))
router.post('/profile/edit', useRoute(userController.updateProfile))
router.get('/user/all', useRoute(userController.getAllUsers))
router.get('/user/allWithDeleted', useRoute(userController.getAllUsersWithDeleted))

router.get('/inventory/consumable/all', useRoute(inventoryController.getAllConsumables))
router.get('/inventory/consumable/removed', useRoute(inventoryController.getAllRemovedConsumables))
router.get('/inventory/non-consumable/all', useRoute(inventoryController.getAllNonConsumables))
router.get(
	'/inventory/non-consumable/removed',
	useRoute(inventoryController.getAllRemovedNonConsumables)
)

export default router

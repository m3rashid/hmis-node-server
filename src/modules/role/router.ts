import { Router } from 'express'

import {
	createRole,
	deleteRole,
	editRole,
	getDetailRoles,
	getRoleDetails,
	getRoleWithDeleted
	// getRoles
} from 'modules/role/controller'
import { useRoute } from 'utils/errors'

const roleRouter = Router()

roleRouter.get('/all', useRoute(getDetailRoles))
roleRouter.get('/all-with-deleted', useRoute(getRoleWithDeleted))
roleRouter.post('/create', useRoute(createRole))
roleRouter.post('/edit', useRoute(editRole))
roleRouter.post('/delete', useRoute(deleteRole))
roleRouter.post('/details', useRoute(getRoleDetails))

export default roleRouter

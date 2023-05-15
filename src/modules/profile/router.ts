import { Router } from 'express'

import {
	createProfile,
	// getAllUsers,
	// getAllUsersWithDeleted,
	updateProfile
} from 'modules/profile/controller'
import { useRoute } from 'utils/errors'

const profileRouter = Router()

profileRouter.post('/create', useRoute(createProfile))
profileRouter.post('/edit', useRoute(updateProfile))

export default profileRouter

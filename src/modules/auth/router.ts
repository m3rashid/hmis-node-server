import { Router } from 'express'

import {
	getAllUsers,
	getAllUsersWithDeleted,
	login,
	logout,
	revalidateToken
	// currentUser,
	// currentUserAllDetails,
	// forgotPassword,
	// resetPassword,
	// signupPatientFinalize,
	// signupPatientInit,
	// signupPatientStepTwo,
	// signupUser,
	// updatePassword
} from 'modules/auth/controller'
import { loginSchema } from 'modules/auth/validator'
import validate from 'modules/default/validator'
import { useRoute } from 'utils/errors'

const authRouter = Router()

authRouter.post('/login', validate(loginSchema), useRoute(login))
authRouter.post('/logout', useRoute(logout))
authRouter.post('/revalidate', useRoute(revalidateToken))

authRouter.get('/user/all', useRoute(getAllUsers))
authRouter.get('/user/all-with-deleted', useRoute(getAllUsersWithDeleted))

export default authRouter

import bcrypt from 'bcrypt'
import UserModel from 'models/user'
import { newError } from 'helpers/errors'
import type { Request, Response } from 'express'
import { issueJWT, revalidateJWT } from 'helpers/jwt'
import type { LoginBody } from 'handlers/auth/validator'

export const login = async (req: Request<any, any, LoginBody>, res: Response) => {
	const { email, password } = req.body
	const user = await UserModel.findOne({ email })
		.populate('roles')
		.populate('roles.permissions')
		.populate('profile')
		.lean()

	if (!user) throw newError('User not found')
	const match = await bcrypt.compare(password, user.password)
	if (!match) throw newError('Invalid Credentials')

	const { accessToken, refreshToken } = issueJWT(user)
	return res.status(200).json({
		user,
		accessToken,
		refreshToken
	})
}

export const revalidateToken = async (req: Request, res: Response) => {
	const rfToken = req.headers.authorization
	if (!rfToken) throw newError('No token Provided')

	const { valid, expired, payload } = revalidateJWT(rfToken)
	if (!valid || expired) throw new Error('Unauthorized')
	const userId = (payload?.sub as any)?._id
	if (!userId) throw newError('No user found')

	const user = await UserModel.findById(userId)
		.populate('roles')
		.populate('roles.permissions')
		.populate('profile')
		.lean()

	if (!user) throw newError('User not found')
	const { accessToken, refreshToken } = issueJWT(user)
	return res.status(200).json({
		user,
		accessToken,
		refreshToken
	})
}

export const logout = async (req: Request, res: Response) => {
	return res.sendStatus(200)
}

export const currentUser = async (req: Request, res: Response) => {}

export const currentUserAllDetails = async (req: Request, res: Response) => {}

export const signupUser = async (req: Request, res: Response) => {}

export const signupPatientInit = async (req: Request, res: Response) => {}

export const signupPatientStepTwo = async (req: Request, res: Response) => {}

export const signupPatientFinalize = async (req: Request, res: Response) => {}

export const updatePassword = async (req: Request, res: Response) => {}

export const forgotPassword = async (req: Request, res: Response) => {}

export const resetPassword = async (req: Request, res: Response) => {}

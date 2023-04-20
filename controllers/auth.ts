import type { Request, Response } from 'express'
import UserModel from 'models/user'
import bcrypt from 'bcrypt'
import { issueJWT } from 'helpers/jwt'
import type { LoginBody } from 'validators/auth'

export const login = async (req: Request<any, any, LoginBody>, res: Response) => {
	const { email, password } = req.body
	const user = await UserModel.findOne({ email })
		.populate('roles')
		.populate('roles.permissions')
		.populate('profile')
		.lean()

	if (!user) throw new Error('User not found')

	const match = await bcrypt.compare(password, user.password)
	if (!match) throw new Error('Invalid Credentials')

	const { accessToken, refreshToken } = issueJWT(user)
	return res.status(200).json({
		user,
		accessToken,
		refreshToken
	})
}

export const logout = async (req: Request, res: Response) => {}

export const currentUser = async (req: Request, res: Response) => {}

export const currentUserAllDetails = async (req: Request, res: Response) => {}

export const signupUser = async (req: Request, res: Response) => {}

export const signupPatientInit = async (req: Request, res: Response) => {}

export const signupPatientStepTwo = async (req: Request, res: Response) => {}

export const signupPatientFinalize = async (req: Request, res: Response) => {}

export const updatePassword = async (req: Request, res: Response) => {}

export const forgotPassword = async (req: Request, res: Response) => {}

export const resetPassword = async (req: Request, res: Response) => {}

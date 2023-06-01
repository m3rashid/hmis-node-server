import JWT from 'jsonwebtoken'
import type { IUser } from 'modules/auth/models/user'

export interface ILoginUser {
	_id: string
	roles: any
	name: string
	email: string
}

export const issueJWT = (user: IUser) => {
	const payload = {
		sub: {
			_id: user._id,
			roles: user.roles,
			name: user.name,
			email: user.email
		} as ILoginUser,
		iat: Date.now()
	}

	const refreshToken = JWT.sign(payload, process.env.REFRESH_SECRET, {})
	const accessToken = JWT.sign(payload, process.env.ACCESS_SECRET, {
		expiresIn: '1d'
	})
	return { accessToken, refreshToken }
}

export const verifyJWT = (token: string) => {
	try {
		const extractedToken = token.split(' ')[1]
		const decoded = JWT.verify(extractedToken, process.env.ACCESS_SECRET)
		return {
			valid: true,
			expired: false,
			payload: decoded
		}
	} catch (err: any) {
		return {
			valid: false,
			expired: err.message === 'jwt expired',
			payload: null
		}
	}
}

export const revalidateJWT = (token: string) => {
	try {
		const extractedToken = token.split(' ')[1]
		const decoded = JWT.verify(extractedToken, process.env.REFRESH_SECRET)
		return {
			valid: true,
			expired: false,
			payload: decoded
		}
	} catch (err: any) {
		return {
			valid: false,
			expired: err.message === 'jwt expired',
			payload: null
		}
	}
}

export const invalidateJWT = (token: string) => {
	console.log('Hello')
}

import { verifyJWT } from 'helpers/jwt'
import { newError, useRoute } from 'helpers/errors'
import type { ILoginUser } from 'helpers/jwt'
import type { NextFunction, Request, Response } from 'express'

export const actualAuthCheck = (req: Request) => {
	const token = req.headers.authorization
	if (!token) throw newError('Token not provided')
	const { valid, expired, payload } = verifyJWT(token)
	if (!valid || expired) throw newError('Token invalid or expired')
	const tokenUser: ILoginUser = payload?.sub as any
	req.user = tokenUser
	req.isAuthenticated = true
	return req
}

export const checkAuth = useRoute((req: Request, res: Response, next: NextFunction) => {
	actualAuthCheck(req)
	next()
})

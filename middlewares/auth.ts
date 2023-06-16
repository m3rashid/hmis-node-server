import type { NextFunction, Request, Response } from 'express'

import { newError, useRoute } from 'utils/errors'
import { verifyJWT } from 'utils/jwt'
import type { ILoginUser } from 'utils/jwt'

export const actualAuthCheck = (req: Request): Request => {
	const token = req.headers.authorization
	if (!token) throw newError('Token not provided')
	const { valid, expired, payload } = verifyJWT(token)
	if (!valid || expired) throw newError('Token invalid or expired')
	const tokenUser: ILoginUser = payload?.sub as any
	req.user = tokenUser
	req.isAuthenticated = true
	return req
}

export const checkAuth: ReturnType<typeof useRoute> = useRoute((req: Request, res: Response, next: NextFunction) => {
	actualAuthCheck(req)
	next()
})

import type { NextFunction, Request, Response } from 'express'

export const useRoute = (check: any) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(check(req, res, next)).catch(next)
}

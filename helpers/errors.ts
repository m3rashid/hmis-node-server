import type { NextFunction, Request, Response } from 'express'

export const useRoute = (check: any) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(check(req, res, next)).catch(next)
}

export const globalErrorHandlerMiddleware = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(err)
	return res.status(500).json({
		message:
			process.env.NODE_ENV !== 'production'
				? JSON.stringify(err.message) || 'Internal Server Error'
				: 'Internal Server Error'
	})
}

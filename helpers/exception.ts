import type { Request, Response, NextFunction } from 'express'
import { logger } from 'helpers/logger'

const exception = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (err) {
		if (err.error) {
			return res.status(400).json(err)
		} else {
			logger.error(err)
			logger.error(err.stack)
			return res.status(500).json({
				error: true,
				args: {},
				exceptions: [
					{
						code: 'INTERNAL_SERVER_ERROR',
						message: 'Something went wrong'
					}
				],
				data: {}
			})
		}
	}

	next()
}

export default exception

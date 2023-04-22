import type { z } from 'zod'
import { newZodErrors } from 'helpers/errors'
import type { NextFunction, Request, Response } from 'express'

const validateSchema = (schema: z.ZodObject<any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse({
			body: req.body,
			query: req.query,
			params: req.params
		})
		if (result.success) next()
		else throw newZodErrors(result.error.issues)
	}
}

export default validateSchema

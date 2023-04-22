import type { z } from 'zod'
import { newZodErrors, useRoute } from 'helpers/errors'
import type { NextFunction, Request, Response } from 'express'

export const onlyValidate = (req: Request, schema: z.ZodObject<any>) => {
	const result = schema.safeParse({
		body: req.body,
		query: req.query,
		params: req.params
	})

	if (!result.success) throw newZodErrors(result.error.issues)
}

const validate = (schema: z.ZodObject<any>) => {
	return useRoute((req: Request, res: Response, next: NextFunction) => {
		onlyValidate(req, schema)
		next()
	})
}

export default validate

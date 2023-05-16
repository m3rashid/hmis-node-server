import type { NextFunction, Request, Response } from 'express'
import type { z } from 'zod'

import type { IError } from 'utils/errors'
import { newZodErrors, useRoute } from 'utils/errors'

export const onlyValidate = (req: Request, schema: z.ZodObject<any>): IError[] => {
	const result = schema.safeParse({
		body: req.body,
		query: req.query,
		params: req.params
	})

	if (!result.success) return newZodErrors(result.error.issues)
	return []
}

const validate = (schema: z.ZodObject<any>) => {
	return useRoute((req: Request, res: Response, next: NextFunction) => {
		onlyValidate(req, schema)
		next()
	})
}

export default validate

import type { Request, Response } from 'express'
import type { FilterQuery, PaginateOptions } from 'mongoose'
import type { z } from 'zod'

import type { PartialUser } from 'modules/default/controllers/base'
import type { IDbSchemaKeys, ModelSchemasTypes, PaginateModel } from 'modules/default/model'
import { onlyValidate } from 'modules/default/validator'
import type { IError } from 'utils/errors'
import { newError, useRoute } from 'utils/errors'

type ListQuery<M extends IDbSchemaKeys> = FilterQuery<ModelSchemasTypes[M]>
type ListResponse<M extends IDbSchemaKeys> = ModelSchemasTypes[M] | IError | IError[]

interface ListOptions<M extends IDbSchemaKeys> {
	validator?: z.ZodObject<any>
	skipValidator?: boolean
	maxLimit?: number
	populate?: string[]
	reqTransformer?: (req: Request) => Promise<Request>
	optionsTransformer?: (_: {
		user: PartialUser | null
		options: PaginateOptions
	}) => Promise<PaginateOptions>
	queryTransformer?: (_: { user: PartialUser | null; query: ListQuery<M> }) => Promise<ListQuery<M>>
	serializer?: (_: { user: PartialUser | null; data: ListResponse<M> }) => Promise<ListResponse<M>>
}

export const List = <M extends IDbSchemaKeys>(
	model: PaginateModel<any>,
	{
		populate,
		validator,
		maxLimit = 20,
		skipValidator = false,
		reqTransformer = async req => req,
		optionsTransformer = async ({ user, options }) => options,
		queryTransformer = async ({ user, query }) => query,
		serializer = async ({ user, data }) => data
	}: ListOptions<M>
) =>
	useRoute(
		async (
			_req: Request<any, any, { query: ListQuery<M>; options: PaginateOptions }>,
			res: Response<ListResponse<M>>
		) => {
			const req = await reqTransformer(_req)
			const user = req.user

			const limit = Math.max(Number((req.body.options || {}).limit || 0), maxLimit)
			const page = Number((req.body.options || {}).page || 0) || 1
			const options = await optionsTransformer({
				user,
				options: {
					...req.body.options,
					page,
					limit,
					populate
				}
			})

			if (!validator && !skipValidator) return res.json(newError('Invalid Router Configuration'))

			const query = await queryTransformer({ user, query: req.body.query || {} })

			if (limit > maxLimit) return res.json(newError('Maximum limit exceeded'))
			if (validator) {
				const errors = onlyValidate(req, validator)
				if (errors.length > 0) return res.json(errors)
			}

			const ogData = await model.paginate(query, options)
			const data = await serializer({
				user,
				data: JSON.parse(JSON.stringify(ogData))
			})

			return res.json(data)
		}
	)

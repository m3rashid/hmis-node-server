import type { Request, Response } from 'express'
import type { FilterQuery, PaginateOptions } from 'mongoose'
import type { z } from 'zod'

import type { PartialUser } from 'modules/default/controllers/base'
import type { IDbSchemaKeys, ModelSchemasTypes } from 'modules/default/model'
import { models } from 'modules/default/model/modelMap'
import { onlyValidate } from 'modules/default/validator'
import { newError } from 'utils/errors'

type ListResponse<M extends IDbSchemaKeys, T> = T | ModelSchemasTypes[M]

type ListQuery<M extends IDbSchemaKeys> = FilterQuery<ModelSchemasTypes[M]>

interface ListOptions<M extends IDbSchemaKeys, T> {
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
	serializer?: (_: {
		user: PartialUser | null
		data: ListResponse<M, T>
	}) => Promise<ListResponse<M, T>>
}

export const List =
	<M extends IDbSchemaKeys, T>(
		modelName: M,
		{
			populate,
			validator,
			maxLimit = 20,
			skipValidator = false,
			reqTransformer = async req => req,
			optionsTransformer = async ({ user, options }) => options,
			queryTransformer = async ({ user, query }) => query,
			serializer = async ({ user, data }) => data
		}: ListOptions<M, T>
	) =>
	async (
		_req: Request<any, any, { query: ListQuery<M>; options: PaginateOptions }>,
		res: Response<ListResponse<M, T>>
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

		if (!validator && !skipValidator) return newError('Invalid Router Configuration')

		const model = models[modelName]
		const query = await queryTransformer({ user, query: req.body.query || {} })

		if (limit > maxLimit) return newError('Maximum limit exceeded')
		if (validator) onlyValidate(req, validator)

		const ogData = await model.paginate(query, options)
		const data = await serializer({
			user,
			data: JSON.parse(JSON.stringify(ogData))
		})

		return res.json(data)
	}

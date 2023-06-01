import type { Request, Response } from 'express'
import mongoose from 'mongoose'
import type { z } from 'zod'

import type { PartialUser } from 'controllers/default/base'
import type { IDbSchemaKeys, ModelSchemasTypes, PaginateModel } from 'models'
import type { IError } from 'utils/errors'
import { newError, useRoute } from 'utils/errors'
import { onlyValidate } from 'validators'

type EditPayload<M extends IDbSchemaKeys> = ModelSchemasTypes[M]
type EditResponse<M extends IDbSchemaKeys> = ModelSchemasTypes[M] | IError | IError[]

interface EditOptions<M extends IDbSchemaKeys> {
	skipValidator?: boolean
	validator?: z.ZodObject<any>
	reqTransformer?: (req: Request) => Promise<Request>
	payloadTransformer?: (_: {
		user: PartialUser | null
		payload: EditPayload<M>
	}) => Promise<EditPayload<M>>
	serializer?: (_: {
		user: PartialUser | null
		data: Promise<EditResponse<M>>
	}) => Promise<EditResponse<M>>
}

// TODO: INCOMPLETE
export const Edit = <M extends IDbSchemaKeys>(
	model: PaginateModel<any>,
	{
		validator,
		skipValidator,
		reqTransformer = async req => req,
		payloadTransformer = async ({ user, payload }) => payload,
		serializer = async ({ user, data }) => data
	}: EditOptions<M>
) =>
	useRoute(
		async (
			_req: Request<any, any, { payload: EditPayload<M> }>,
			res: Response<EditResponse<M>>
		) => {
			const req = await reqTransformer(_req)
			const user = req.user

			const payload = await payloadTransformer({
				user,
				payload: req.body.payload || {}
			})

			if (!validator && !skipValidator) return res.json(newError('Invalid Router Configuration'))
			if (validator) {
				const errors = onlyValidate(req, validator)
				if (errors.length > 0) return res.json(errors)
			}

			const obj = new model({
				...payload,
				...(req.user && {
					createdBy: new mongoose.Types.ObjectId(req.user._id),
					lastUpdatedBy: new mongoose.Types.ObjectId(req.user._id)
				})
			})

			await obj.save()

			const data = await serializer({
				user,
				data: JSON.parse(JSON.stringify(obj))
			})

			res.status(200).json(data)
		}
	)

import type { Request } from 'express'
import type { FilterQuery, PaginateOptions } from 'mongoose'

import type { IDbSchemaValues as DatabaseName } from 'modules/default/model'
import type { IRole } from 'modules/role/models/role'

export interface PartialUser {
	_id: string
	name: string
	email: string
	roles: IRole[]
}

type ListResponse<M extends DatabaseName, T> = T | (SchemaMap[M] & { _id: string })

type ListQuery<M extends DatabaseName> = FilterQuery<SchemaMap[M]>

interface ListOptions<M extends DatabaseName, T> {
	validator?: ObjectSchema<any>
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

import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import { baseModelSchema, modelNames } from 'models/base'

export const ALL_RESOURCES = 'ALL'

export const ALL_PERMISSION_SCOPE = 'ALL'
export const SELF_PERMISSION_SCOPE = 'SELF'
export const NOT_ALLOWED_PERMISSION_ACTUAL_NAMES = ['DEVELOPER', 'SUPER_ADMIN'] as const

export interface IPermission {
	displayName: string
	actualName: string
	description?: string
	resourceType: string // database name (in short) or ALL
	scope: string // self, all or resourceId
	permission: number // bitwise permission
}

export interface IRole extends IBaseModel {
	displayName: string
	actualName: string
	description?: string
	permissions: IPermission[]
}

const roleSchema = new mongoose.Schema<IRole>(
	{
		...baseModelSchema,
		displayName: { type: String, required: true },
		actualName: { type: String, unique: true, required: true },
		description: { type: String },
		permissions: [
			{
				displayName: { type: String, required: true },
				actualName: { type: String, required: true },
				description: { type: String },
				resourceType: { type: String, required: true },
				scope: { type: String, required: true },
				permission: { type: Number, required: true }
			}
		]
	},
	{ timestamps: true }
)

roleSchema.plugin(paginate)
export interface IRoleDocument extends Omit<mongoose.Document, '_id'>, IRole {}

const RoleModel = mongoose.model<IRoleDocument, mongoose.PaginateModel<IRoleDocument>>(
	modelNames.role,
	roleSchema
)
export default RoleModel

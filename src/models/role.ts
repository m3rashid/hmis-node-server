import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import type { IPermission } from 'models/permission'
import { baseModelSchema, modelNames } from 'models/base'

export const ALL_RESOURCES = 'ALL'

export const ALL_PERMISSION_SCOPE = 'ALL'
export const SELF_PERMISSION_SCOPE = 'SELF'
export const NOT_ALLOWED_PERMISSION_ACTUAL_NAMES = ['DEVELOPER', 'SUPER_ADMIN'] as const

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
		permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.permission }]
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

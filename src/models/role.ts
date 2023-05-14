import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import { baseModelSchema, modelNames } from 'models/base'

export const NOT_ALLOWED_ROLE_ACTUAL_NAMES = ['DEVELOPER', 'SUPER_ADMIN']

type SpecialResource = 'ALL' | 'INDEPENDENT'
export interface IPermission {
	[resourceTypeName: string]: {
		[permission: string]: SpecialResource | string[] // <ObjectId> | 'SELF'
	}
}

export interface IRole extends IBaseModel {
	displayName: string
	actualName: string
	description?: string
	permissions: IPermission
}

const roleSchema = new mongoose.Schema<IRole>(
	{
		...baseModelSchema,
		displayName: { type: String, required: true },
		actualName: { type: String, unique: true, required: true },
		description: { type: String },
		permissions: { type: mongoose.Schema.Types.Mixed, required: true }
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

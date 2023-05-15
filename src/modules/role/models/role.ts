import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { baseModelSchema, models } from 'modules/default/model'
import type { Document, IBaseModel, PaginateModel } from 'modules/default/model'

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

const RoleModel = mongoose.model<Document<IRole>, PaginateModel<IRole>>(
	models.role.name,
	roleSchema
)
export default RoleModel

import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import { baseModelSchema, modelNames } from 'models/base'

export const PERMISSION = [
	'READ',
	'WRITE',
	'UPDATE',
	'DELETE',
	'BULK_UPDATE',
	'BULK_DELETE'
] as const

export interface IPermission extends IBaseModel {
	displayName: string
	actualName: string
	description?: string
	resourceType: string // resourceType or ALL
	scope: string // self, all or resourceId
	permission: (typeof PERMISSION)[number]
}

const permissionSchema = new mongoose.Schema<IPermission>(
	{
		...baseModelSchema,
		displayName: { type: String, required: true },
		actualName: { type: String, unique: true, required: true },
		description: { type: String },
		resourceType: { type: String, required: true },
		scope: { type: String, required: true },
		permission: { type: String, required: true, enum: PERMISSION }
	},
	{ timestamps: true }
)

permissionSchema.plugin(paginate)
export interface IPermissionDocument extends Omit<mongoose.Document, '_id'>, IPermission {}

const PermissionModel = mongoose.model<
	IPermissionDocument,
	mongoose.PaginateModel<IPermissionDocument>
>(modelNames.permission, permissionSchema)
export default PermissionModel

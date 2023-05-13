import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { baseModelSchema, modelNames } from 'models/base'

export interface IPermission {
	displayName: string
	actualName: string
	description?: string
	permissions: Array<{
		resourceType: string // database name (in short) or ALL
		scope: string[] // ALL | SELF | ResourceId
		accessLevel: number // bitwise permission
	}>
}

const permissionSchema = new mongoose.Schema<IPermission>(
	{
		...baseModelSchema,
		displayName: { type: String, required: true },
		actualName: { type: String, required: true },
		description: { type: String },
		permissions: [
			{
				resourceType: { type: String, required: true },
				scope: [{ type: String, required: true }],
				accessLevel: { type: Number, required: true }
			}
		]
	},
	{}
)

permissionSchema.plugin(paginate)
export interface IPermissionDocument extends Omit<mongoose.Document, '_id'>, IPermission {}

const PermissionModel = mongoose.model<
	IPermissionDocument,
	mongoose.PaginateModel<IPermissionDocument>
>(modelNames.permission, permissionSchema)

export default PermissionModel

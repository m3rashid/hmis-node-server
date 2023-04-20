import mongoose from 'mongoose'
import type { IRole } from 'models/role'
import type { IBaseModel } from 'models/base'
import { baseModelSchema } from 'models/base'
import type { IResource } from 'models/resource'
import paginate from 'mongoose-paginate-v2'

export interface IPermission extends IBaseModel {
	name: string
	description?: string
	resource: IResource
	roles?: IRole[]
}

const permissionSchema = new mongoose.Schema<IPermission>(
	{
		...baseModelSchema,
		name: { type: String, required: true },
		description: { type: String },
		resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
		roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }]
	},
	{ timestamps: true }
)

permissionSchema.plugin(paginate)
interface IPermissionDocument extends Omit<mongoose.Document, '_id'>, IPermission {}

const PermissionModel = mongoose.model<
	IPermissionDocument,
	mongoose.PaginateModel<IPermissionDocument>
>('Permission', permissionSchema)
export default PermissionModel

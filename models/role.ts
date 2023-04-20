import type { IBaseModel } from 'models/base'
import mongoose from 'mongoose'
import { baseModelSchema } from 'models/base'
import type { IPermission } from 'models/permission'
import paginate from 'mongoose-paginate-v2'

export interface IRole extends IBaseModel {
	displayName: string
	actualName: string
	description?: string
	permissions: IPermission[]
}

export const NOT_ALLOWED_ACTUAL_NAMES = ['DEVELOPER', 'SUPER_ADMIN']

const roleSchema = new mongoose.Schema<IRole>(
	{
		...baseModelSchema,
		displayName: { type: String, required: true },
		actualName: { type: String, unique: true, required: true },
		description: { type: String },
		permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true }]
	},
	{ timestamps: true }
)

roleSchema.plugin(paginate)
interface IRoleDocument extends Omit<mongoose.Document, '_id'>, IRole {}

const RoleModel = mongoose.model<IRoleDocument, mongoose.PaginateModel<IRoleDocument>>(
	'Role',
	roleSchema
)
export default RoleModel

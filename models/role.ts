import type { IBaseModel } from 'models/base'
import mongoose from 'mongoose'
import { baseModelSchema } from 'models/base'
import type { IUser } from 'models/user'
import type { IPermission } from 'models/permission'
import paginate from 'mongoose-paginate-v2'

export interface IRole extends IBaseModel {
	name: string
	description?: string
	users: IUser[]
	permissions: IPermission[]
}

const roleSchema = new mongoose.Schema<IRole>(
	{
		...baseModelSchema,
		name: { type: String, required: true },
		description: { type: String },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
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

import type { IBaseModel } from 'models/base'
import mongoose from 'mongoose'
import type { IRole } from 'models/role'
import { baseModelSchema } from 'models/base'
import type { IProfile } from 'models/profile'
import paginate from 'mongoose-paginate-v2'

export interface IUser extends IBaseModel {
	name: string
	email: string
	password: string
	roles: IRole[]
	profile: IProfile
}

const userSchema = new mongoose.Schema<IUser>(
	{
		...baseModelSchema,
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }],
		profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true }
	},
	{ timestamps: true }
)

userSchema.plugin(paginate)
interface IUserDocument extends Omit<mongoose.Document, '_id'>, IUser {}

const UserModel = mongoose.model<IUserDocument, mongoose.PaginateModel<IUserDocument>>(
	'User',
	userSchema
)
export default UserModel

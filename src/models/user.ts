import mongoose from 'mongoose'
import type { IRole } from 'models/role'
import paginate from 'mongoose-paginate-v2'
import type { IBaseModel } from 'models/base'
import type { IProfile } from 'models/profile'
import { baseModelSchema, modelNames } from 'models/base'

export interface IUser extends IBaseModel {
	name: string
	email: string
	emailVerified: boolean
	password: string
	roles: IRole[]
	profile: IProfile
}

const userSchema = new mongoose.Schema<IUser>(
	{
		...baseModelSchema,
		name: { type: String, required: true },
		email: { type: String, required: true },
		emailVerified: { type: Boolean, default: false },
		password: { type: String, required: true },
		roles: [{ type: mongoose.Schema.Types.ObjectId, ref: modelNames.role, required: true }],
		profile: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.profile }
	},
	{ timestamps: true }
)

userSchema.plugin(paginate)
export interface IUserDocument extends Omit<mongoose.Document, '_id'>, IUser {}

const UserModel = mongoose.model<IUserDocument, mongoose.PaginateModel<IUserDocument>>(
	modelNames.user,
	userSchema
)
export default UserModel

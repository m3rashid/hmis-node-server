import mongoose from 'mongoose'
import type { IRole } from 'models/role'
import paginate from 'mongoose-paginate-v2'
import type { IProfile } from 'models/profile'
import { baseModelSchema, modelNames } from 'models/base'
import type { Document, IBaseModel, PaginateModel } from 'models/base'

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

const UserModel = mongoose.model<Document<IUser>, PaginateModel<IUser>>(modelNames.user, userSchema)
export default UserModel

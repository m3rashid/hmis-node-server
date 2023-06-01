import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { baseModelSchema, modelNames as models } from 'models'
import type { Document, IBaseModel, PaginateModel } from 'models'
import type { IProfile } from 'models/profile'
import type { IRole } from 'models/role'

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
		roles: [{ type: mongoose.Schema.Types.ObjectId, ref: models.role, required: true }],
		profile: { type: mongoose.Schema.Types.ObjectId, ref: models.profile }
	},
	{ timestamps: true }
)

userSchema.plugin(paginate)

export const UserModel = mongoose.model<Document<IUser>, PaginateModel<IUser>>(
	models.user,
	userSchema
)

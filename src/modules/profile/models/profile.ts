import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import type { IAppointment } from 'modules/appointment/models/appointment'
import type { IUser } from 'modules/auth/models/user'
import type { IAvailability } from 'modules/availability/models/availability'
import type { ILeave } from 'modules/availability/models/leave'
import { baseModelSchema, modelNames as models } from 'modules/default/model'
import type { Document, IBaseModel, PaginateModel } from 'modules/default/model'
import type { IAddress } from 'modules/profile/models/address'

export const SEX: readonly string[] = ['M', 'F', 'O']

export const MARITAL_STATUS: readonly string[] = ['S', 'M', 'D', 'W'] // Single, Married, Divorced, Widowed

export const BLOOD_GROUPS: readonly string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export interface IProfile extends IBaseModel {
	bio?: string
	roomNumber?: string
	age?: number
	sex: string
	phone?: string
	phoneVerified: boolean
	maritalStatus?: string
	profilePicture?: string
	addresses?: IAddress[]
	bloodGroup?: string
	origin?: string
	lastVisit?: Date
	designation?: string
	department?: string
	userHealthId?: string
	user: IUser
	leaves: ILeave[]
	availabilities: IAvailability[]
	appointmentsAsDoctor: IAppointment[]
	appointmentsAsPatient: IAppointment[]
	appointmentsAsReferredBy: IAppointment[]
}

const profileSchema = new mongoose.Schema<IProfile>(
	{
		...baseModelSchema,
		bio: { type: String },
		roomNumber: { type: String },
		age: { type: Number },
		sex: { type: String, required: true, enum: SEX },
		phone: { type: String },
		phoneVerified: { type: Boolean, default: false },
		maritalStatus: { type: String, enum: MARITAL_STATUS },
		profilePicture: { type: String },
		addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: models.address }],
		bloodGroup: { type: String, enum: BLOOD_GROUPS },
		origin: { type: String },
		lastVisit: { type: Date },
		designation: { type: String },
		department: { type: String },
		userHealthId: { type: String },
		user: { type: mongoose.Schema.Types.ObjectId, ref: models.user, required: true },
		leaves: [{ type: mongoose.Schema.Types.ObjectId, ref: models.leave }],
		availabilities: [{ type: mongoose.Schema.Types.ObjectId, ref: models.availability }],
		appointmentsAsDoctor: [{ type: mongoose.Schema.Types.ObjectId, ref: models.appointment }],
		appointmentsAsPatient: [{ type: mongoose.Schema.Types.ObjectId, ref: models.appointment }],
		appointmentsAsReferredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: models.appointment }]
	},
	{ timestamps: true }
)

profileSchema.plugin(paginate)

const ProfileModel = mongoose.model<Document<IProfile>, PaginateModel<IProfile>>(
	models.profile,
	profileSchema
)
export default ProfileModel
